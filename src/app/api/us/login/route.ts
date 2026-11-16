import { cookies } from "next/headers";
import { checkPasscode, COOKIE, loginBlocked, loginFailed, sessionToken, usEnabled } from "@/lib/us";

export async function POST(req: Request) {
  if (!usEnabled) return Response.json({ error: "Switched off." }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (await loginBlocked(ip)) {
    return Response.json({ error: "Too many tries. Try again in an hour." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (typeof body?.code !== "string" || !checkPasscode(body.code)) {
    await loginFailed(ip);
    // A little friction against guessing.
    await new Promise((r) => setTimeout(r, 600));
    return Response.json({ error: "Not quite." }, { status: 401 });
  }
  (await cookies()).set(COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return Response.json({ ok: true });
}
