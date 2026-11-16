import { cookies } from "next/headers";
import { COOKIE, isSignedIn, PEOPLE, readAll, usEnabled } from "@/lib/us";

export const dynamic = "force-dynamic";

// Everything as a CSV: one row per person per day that has anything logged.
const cell = (v: string | number | undefined) => {
  const s = v === undefined ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export async function GET() {
  if (!usEnabled) return new Response("Switched off.", { status: 503 });
  if (!isSignedIn((await cookies()).get(COOKIE)?.value)) {
    return new Response("Passcode first.", { status: 401 });
  }

  const { moods, period, work } = await readAll();
  const dates = new Set([...Object.keys(moods), ...Object.keys(work)].map((k) => k.split(":")[0]));
  Object.keys(period).forEach((d) => dates.add(d));

  const rows = [["date", "person", "mood", "logged_at", "note", "at_work", "period"]];
  for (const date of [...dates].sort()) {
    for (const who of PEOPLE) {
      const e = moods[`${date}:${who}`];
      const w = work[`${date}:${who}`];
      const p = who === "sophie" ? period[date] : undefined;
      if (!e && !w && !p) continue;
      rows.push([
        date,
        who,
        e?.mood ?? "",
        e ? new Date(e.t).toISOString() : "",
        e?.note ?? "",
        w ?? "",
        p ?? "",
      ]);
    }
  }

  const csv = rows.map((r) => r.map(cell).join(",")).join("\n") + "\n";
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="utkarsh-sophie-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
