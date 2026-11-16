import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Gate, UsJournal } from "@/components/UsJournal";
import { COOKIE, isSignedIn, readAll, usEnabled } from "@/lib/us";
import "./us.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Utkarsh × Sophie · Work Mood Tracker",
  robots: { index: false, follow: false },
};

export default async function UsPage() {
  if (!usEnabled) notFound();
  const signedIn = isSignedIn((await cookies()).get(COOKIE)?.value);
  return (
    <main className="page us">
      {signedIn ? <UsJournal initial={await readAll()} /> : <Gate />}
    </main>
  );
}
