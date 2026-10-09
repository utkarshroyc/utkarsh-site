"use client";

import { useEffect, useState } from "react";
import { CRITTER_EVENT, CRITTERS, foundCount, HUNT_COMPLETE, REVEAL_GANGA, useCritters, type Critter } from "@/lib/critters";
import { EMAIL } from "@/lib/content";

// Footer tally for the critter hunt, with hints for the ones still hiding.

const INFO: Record<Critter, { name: string; icon: string; hint: string; found: string }> = {
  cardinal: {
    name: "Cardinal",
    icon: "🐦",
    hint: "Something red is perched on a line nearby.",
    found: "You spotted the cardinal.",
  },
  flicker: {
    name: "Northern Flicker",
    icon: "🪶",
    hint: "Something is drumming on the edge of the map.",
    found: "You found the flicker.",
  },
  turtle: {
    name: "Turtle",
    icon: "🐢",
    hint: "Something slow is walking along the bottom of the page.",
    found: "You found the turtle.",
  },
  dolphin: {
    name: "Ganga river dolphin",
    icon: "🐬",
    hint: "Type the river's name anywhere on the page.",
    found: "You found the river dolphin.",
  },
};

export default function CritterHunt() {
  const { found } = useCritters();
  const [toast, setToast] = useState<string | null>(null);
  const [celebrating, setCelebrating] = useState(false);
  const all = found.length === CRITTERS.length;

  // A short toast whenever a new creature is found.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onFound = (e: Event) => {
      const c = (e as CustomEvent<Critter>).detail;
      const n = foundCount();
      setToast(n === CRITTERS.length ? "You found them all!" : `${INFO[c].found} ${n}/${CRITTERS.length}`);
      if (n === CRITTERS.length) {
        setCelebrating(true);
        window.dispatchEvent(new Event(HUNT_COMPLETE));
      }
      clearTimeout(t);
      t = setTimeout(() => setToast(null), 3500);
    };
    window.addEventListener(CRITTER_EVENT, onFound);
    return () => {
      window.removeEventListener(CRITTER_EVENT, onFound);
      clearTimeout(t);
    };
  }, []);

  return (
    <div className={`hunt${celebrating ? " is-celebrating" : ""}`}>
      <p className="hunt-tally">
        <span>Creatures spotted</span>
        {CRITTERS.map((c) =>
          found.includes(c) ? (
            <span
              key={c}
              className="hunt-slot is-found"
              title={INFO[c].name}
              style={{ "--i": CRITTERS.indexOf(c) } as React.CSSProperties}
            >
              {INFO[c].icon}
            </span>
          ) : c === "dolphin" ? (
            <button
              key={c}
              type="button"
              className="hunt-slot"
              data-tip={`${INFO[c].hint} (Or tap here.)`}
              onClick={() => window.dispatchEvent(new Event(REVEAL_GANGA))}
              aria-label={`Hint: ${INFO[c].hint} Tap to reveal the river.`}
            >
              ?
            </button>
          ) : (
            <span key={c} className="hunt-slot" data-tip={INFO[c].hint} tabIndex={0} aria-label={`Hint: ${INFO[c].hint}`}>
              ?
            </span>
          )
        )}
        <span className="hunt-count">
          {found.length}/{CRITTERS.length}
        </span>
      </p>

      {all && (
        // TODO(utkarsh): rewrite this note in your own words.
        <p className="hunt-note">
          You found all four. A cardinal that never leaves its patch, a flicker drumming far from
          Alabama, a turtle that knows its way home, a dolphin in a river that keeps getting rebuilt
          around it: everything I study comes back to how creatures stay with a place. Thanks for
          staying a while.{" "}
          <a href="https://slightlyunfinished.substack.com/p/tuscaloosa-or-something-like-it" target="_blank" rel="noopener noreferrer">
            Read about the cardinals
          </a>{" "}
          or <a href={`mailto:${EMAIL}`}>say hi</a>.
        </p>
      )}

      <div className={`hunt-toast${toast ? " is-on" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}
