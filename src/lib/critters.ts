"use client";

import { useEffect, useState } from "react";

// The critter hunt: which of the site's creatures this visitor has found.
// Kept in localStorage (a per-visitor convenience); everything works without it.

export const CRITTERS = ["cardinal", "turtle", "dolphin"] as const;
export type Critter = (typeof CRITTERS)[number];

const KEY = "critters-found";
const EVENT = "critter-found";

function read(): Critter[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((c): c is Critter => CRITTERS.includes(c)) : [];
  } catch {
    return [];
  }
}

export function findCritter(c: Critter) {
  const found = read();
  if (found.includes(c)) return;
  try {
    localStorage.setItem(KEY, JSON.stringify([...found, c]));
  } catch {}
  window.dispatchEvent(new CustomEvent(EVENT, { detail: c }));
}

export function useCritters() {
  const [found, setFound] = useState<Critter[]>([]);
  const [latest, setLatest] = useState<Critter | null>(null);
  useEffect(() => {
    const sync = (e?: Event) => {
      setFound(read());
      if (e instanceof CustomEvent) setLatest(e.detail);
    };
    const onStorage = () => sync();
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return { found, latest };
}

// Lets the hunt's hint reveal the river on touch devices, where typing "ganga" is awkward.
export const REVEAL_GANGA = "reveal-ganga";
