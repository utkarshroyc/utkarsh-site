import { createHmac, timingSafeEqual } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

// "Us": a private daily mood log for Utkarsh and Sophie, plus Sophie's period days.
// Same storage as the visitor pins: Upstash Redis in production, a local JSON file in
// development. The page sits behind a shared passcode (US_PASSCODE); in development it
// falls back to "us" so it can be tried, and deployed without a passcode it switches off.

export const PEOPLE = ["utkarsh", "sophie"] as const;
export const MOODS = ["good", "okay", "rough"] as const;
export const FLOWS = ["spotting", "light", "medium", "heavy"] as const;

export type Who = (typeof PEOPLE)[number];
export type Mood = (typeof MOODS)[number];
export type Flow = (typeof FLOWS)[number];
export type Entry = { mood: Mood; t: number; note?: string };
// moods and work arrivals are keyed "YYYY-MM-DD:who", period days "YYYY-MM-DD".
// A work arrival is a local "HH:MM".
export type UsData = {
  moods: Record<string, Entry>;
  period: Record<string, Flow>;
  work: Record<string, string>;
};

const URL = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const FILE = path.join(process.cwd(), ".data", "us.json");
const dev = process.env.NODE_ENV === "development";
const local = !URL && dev;
const PASSCODE = process.env.US_PASSCODE ?? (dev ? "us" : undefined);

export const usEnabled = Boolean(PASSCODE) && (Boolean(URL && TOKEN) || local);

/* ---------- Passcode cookie ---------- */

export const COOKIE = "us";
// The cookie holds a signature of the passcode, so changing the passcode signs everyone out.
const token = () => createHmac("sha256", PASSCODE ?? "").update("us-journal").digest("hex");

export function checkPasscode(code: string) {
  if (!PASSCODE) return false;
  const a = Buffer.from(code.trim().toLowerCase());
  const b = Buffer.from(PASSCODE.toLowerCase());
  return a.length === b.length && timingSafeEqual(a, b);
}
export const sessionToken = token;
export function isSignedIn(cookie: string | undefined) {
  if (!PASSCODE || !cookie) return false;
  const a = Buffer.from(cookie);
  const b = Buffer.from(token());
  return a.length === b.length && timingSafeEqual(a, b);
}

// At most 10 wrong passcodes per IP per hour, keyed by a salted hash so raw IPs are never stored.
const MAX_TRIES = 10;
const ipKey = (ip: string) => createHmac("sha256", process.env.PIN_SALT ?? "us").update(ip).digest("hex").slice(0, 32);
const tries = new Map<string, { n: number; until: number }>();
export async function loginBlocked(ip: string) {
  const key = ipKey(ip);
  if (local) {
    const t = tries.get(key);
    return Boolean(t && t.until > Date.now() && t.n >= MAX_TRIES);
  }
  return Number(await redis<string | null>("GET", `us-login:${key}`)) >= MAX_TRIES;
}
export async function loginFailed(ip: string) {
  const key = ipKey(ip);
  if (local) {
    const t = tries.get(key);
    tries.set(key, t && t.until > Date.now() ? { ...t, n: t.n + 1 } : { n: 1, until: Date.now() + 3_600_000 });
    return;
  }
  if ((await redis<number>("INCR", `us-login:${key}`)) === 1) await redis("EXPIRE", `us-login:${key}`, 3600);
}

/* ---------- Storage ---------- */

async function redis<T>(...command: (string | number)[]): Promise<T> {
  const res = await fetch(URL!, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis ${res.status}`);
  return (await res.json()).result as T;
}

// HGETALL comes back flat: [field, value, field, value, ...]
function pairs<T>(flat: string[], parse: (v: string) => T) {
  const out: Record<string, T> = {};
  for (let i = 0; i < flat.length; i += 2) out[flat[i]] = parse(flat[i + 1]);
  return out;
}

async function readFile(): Promise<UsData> {
  const empty: UsData = { moods: {}, period: {}, work: {} };
  try {
    return { ...empty, ...JSON.parse(await fs.readFile(FILE, "utf8")) };
  } catch {
    return empty;
  }
}
async function writeFile(data: UsData) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(data));
}

export async function readAll(): Promise<UsData> {
  if (local) return readFile();
  const [moods, period, work] = await Promise.all([
    redis<string[]>("HGETALL", "us:moods"),
    redis<string[]>("HGETALL", "us:period"),
    redis<string[]>("HGETALL", "us:work"),
  ]);
  return {
    moods: pairs(moods, (v) => JSON.parse(v) as Entry),
    period: pairs(period, (v) => v as Flow),
    work: pairs(work, (v) => v),
  };
}

export async function setWork(date: string, who: Who, time: string | null) {
  const key = `${date}:${who}`;
  if (local) {
    const data = await readFile();
    if (time) data.work[key] = time;
    else delete data.work[key];
    return writeFile(data);
  }
  if (time) await redis("HSET", "us:work", key, time);
  else await redis("HDEL", "us:work", key);
}

export async function setMood(date: string, who: Who, entry: Entry | null) {
  const key = `${date}:${who}`;
  if (local) {
    const data = await readFile();
    if (entry) data.moods[key] = entry;
    else delete data.moods[key];
    return writeFile(data);
  }
  if (entry) await redis("HSET", "us:moods", key, JSON.stringify(entry));
  else await redis("HDEL", "us:moods", key);
}

export async function setPeriod(date: string, flow: Flow | null) {
  if (local) {
    const data = await readFile();
    if (flow) data.period[date] = flow;
    else delete data.period[date];
    return writeFile(data);
  }
  if (flow) await redis("HSET", "us:period", date, flow);
  else await redis("HDEL", "us:period", date);
}
