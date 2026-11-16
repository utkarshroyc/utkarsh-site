import { cookies } from "next/headers";
import { COOKIE, FLOWS, isSignedIn, MOODS, PEOPLE, readAll, setMood, setPeriod, setWork, usEnabled } from "@/lib/us";
import type { Flow, Mood, Who } from "@/lib/us";

export const dynamic = "force-dynamic";

const isDate = (d: unknown): d is string => typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d);

async function guard() {
  if (!usEnabled) return Response.json({ error: "Switched off." }, { status: 503 });
  if (!isSignedIn((await cookies()).get(COOKIE)?.value)) {
    return Response.json({ error: "Passcode first." }, { status: 401 });
  }
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  return Response.json(await readAll());
}

// { kind: "mood", date, who, mood | null, note? }, { kind: "period", date, flow | null }
// or { kind: "work", date, who, time: "HH:MM" | null }
export async function POST(req: Request) {
  const denied = await guard();
  if (denied) return denied;

  const body = await req.json().catch(() => null);
  if (!isDate(body?.date)) return Response.json({ error: "Bad date." }, { status: 400 });

  if (body.kind === "mood") {
    if (!PEOPLE.includes(body.who)) return Response.json({ error: "Who?" }, { status: 400 });
    if (body.mood === null) {
      await setMood(body.date, body.who as Who, null);
      return Response.json({ entry: null });
    }
    if (!MOODS.includes(body.mood)) return Response.json({ error: "Bad mood." }, { status: 400 });
    const note = typeof body.note === "string" ? body.note.trim().slice(0, 280) : "";
    const entry = { mood: body.mood as Mood, t: Date.now(), ...(note && { note }) };
    await setMood(body.date, body.who as Who, entry);
    return Response.json({ entry });
  }

  if (body.kind === "period") {
    if (body.flow !== null && !FLOWS.includes(body.flow)) {
      return Response.json({ error: "Bad flow." }, { status: 400 });
    }
    await setPeriod(body.date, body.flow as Flow | null);
    return Response.json({ flow: body.flow });
  }

  if (body.kind === "work") {
    if (!PEOPLE.includes(body.who)) return Response.json({ error: "Who?" }, { status: 400 });
    if (body.time !== null && !/^([01]\d|2[0-3]):[0-5]\d$/.test(body.time)) {
      return Response.json({ error: "Bad time." }, { status: 400 });
    }
    await setWork(body.date, body.who as Who, body.time);
    return Response.json({ time: body.time });
  }

  return Response.json({ error: "Unknown kind." }, { status: 400 });
}
