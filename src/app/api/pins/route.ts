import { addPin, claimSlot, listPins, pinsEnabled } from "@/lib/pins";

export const dynamic = "force-dynamic";

// Round to ~11 km so no one's exact location is ever stored.
const round = (n: number) => Math.round(n * 10) / 10;

export async function GET() {
  if (!pinsEnabled) return Response.json({ enabled: false, pins: [] });
  try {
    return Response.json({ enabled: true, pins: await listPins() });
  } catch {
    return Response.json({ enabled: false, pins: [] });
  }
}

export async function POST(req: Request) {
  if (!pinsEnabled) return Response.json({ error: "Pins are switched off." }, { status: 503 });

  const body = await req.json().catch(() => null);
  const lat = Number(body?.lat);
  const lon = Number(body?.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return Response.json({ error: "That isn't on Earth." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (!(await claimSlot(ip))) {
    return Response.json({ error: "You've already dropped a pin today." }, { status: 429 });
  }

  const pin = { lat: round(lat), lon: round(lon), t: Date.now() };
  await addPin(pin);
  return Response.json({ pin });
}
