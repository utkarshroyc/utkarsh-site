import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

// Visitor pins: "where are you reading from?"
// Production uses Upstash Redis over its REST API. Vercel's integration names the
// credentials either UPSTASH_REDIS_REST_URL/_TOKEN or KV_REST_API_URL/_TOKEN. Without those, development falls back to a
// local JSON file so the feature can be tried; deployed without Redis, it switches off.

export type Pin = { lat: number; lon: number; t: number };

const MAX_PINS = 2000;
const URL = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const FILE = path.join(process.cwd(), ".data", "pins.json");
const local = !URL && process.env.NODE_ENV === "development";

export const pinsEnabled = Boolean(URL && TOKEN) || local;

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

async function readFile(): Promise<Pin[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

export async function listPins(): Promise<Pin[]> {
  if (local) return readFile();
  const rows = await redis<string[]>("LRANGE", "pins", 0, MAX_PINS - 1);
  return rows.map((r) => JSON.parse(r));
}

// One pin per visitor per day, keyed by a salted hash so raw IPs are never stored.
const seen = new Map<string, number>();
export async function claimSlot(ip: string): Promise<boolean> {
  const key = createHash("sha256").update(`${process.env.PIN_SALT ?? "pins"}:${ip}`).digest("hex").slice(0, 32);
  if (local) {
    const last = seen.get(key) ?? 0;
    if (Date.now() - last < 86_400_000) return false;
    seen.set(key, Date.now());
    return true;
  }
  return (await redis<string | null>("SET", `pin-rl:${key}`, 1, "EX", 86_400, "NX")) === "OK";
}

export async function addPin(pin: Pin) {
  if (local) {
    const pins = [pin, ...(await readFile())].slice(0, MAX_PINS);
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(pins));
    return;
  }
  await redis("LPUSH", "pins", JSON.stringify(pin));
  await redis("LTRIM", "pins", 0, MAX_PINS - 1);
}
