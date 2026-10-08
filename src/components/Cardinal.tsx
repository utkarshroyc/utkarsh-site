"use client";

import { useEffect, useRef, useState } from "react";
import { findCritter } from "@/lib/critters";
import { CARDINAL_FLIGHT } from "./Rio";

// A cardinal that perches on a rule line: first the masthead, then each section's
// heading as you scroll, flying between them. Click it and it sings.
// A nod to "tuscaloosa, or something like it".

// Song: Jonathon Jongsma, xeno-canto XC75501, CC BY-SA 3.0 (trimmed). Credited in the footer.
const SONG = "/sounds/cardinal.m4a";
const BIRD_H = 28;
const PERCHES = ".masthead > .meta, main section > h2.label";

// Longer trips take longer, but every flight is slow enough to watch.
const flightMs = (distance: number) => Math.round(Math.min(3200, 1400 + distance * 1.6));

export default function Cardinal() {
  const ref = useRef<HTMLButtonElement>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const [singing, setSinging] = useState(false);
  const [top, setTop] = useState<number | null>(null);
  const [flight, setFlight] = useState<{ ms: number; key: number } | null>(null);
  const last = useRef<number | null>(null);
  const landing = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    let frame = 0;
    const place = () => {
      frame = 0;
      const page = ref.current?.offsetParent ?? document.querySelector("main");
      const perches = [...document.querySelectorAll<HTMLElement>(PERCHES)];
      if (!page || !perches.length) return;

      // Perch positions in the page's coordinate space (bottom of each rule line).
      const pageTop = page.getBoundingClientRect().top;
      const lines = perches.map((el) => el.getBoundingClientRect().bottom - pageTop);

      const viewTop = -pageTop; // scroll offset relative to the page
      const focus = viewTop + window.innerHeight * 0.45;
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      const i = atBottom ? lines.length - 1 : Math.max(0, lines.filter((y) => y <= focus).length - 1);
      const next = Math.round(lines[i] - BIRD_H + 1);

      if (next === last.current) return;
      const from = last.current;
      last.current = next;
      if (from === null) {
        setTop(next);
        return;
      }

      // If the old perch has scrolled out of view, slip the bird to just past the
      // screen edge first so the whole flight happens where it can be seen.
      const edgeTop = viewTop - BIRD_H - 8;
      const edgeBottom = viewTop + window.innerHeight + 8;
      const start = from < edgeTop ? edgeTop : from > edgeBottom ? edgeBottom : from;
      const el = ref.current;
      if (el && start !== from) {
        el.style.transition = "none";
        el.style.top = `${start}px`;
        void el.offsetHeight; // commit the jump before the flight transition starts
        el.style.transition = "";
      }
      const ms = flightMs(Math.abs(next - start));
      window.dispatchEvent(new Event(CARDINAL_FLIGHT)); // Rio gives chase
      setFlight({ ms, key: Date.now() });
      setTop(next);
      clearTimeout(landing.current);
      landing.current = setTimeout(() => setFlight(null), ms);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };
    place();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(landing.current);
    };
  }, []);

  const sing = () => {
    findCritter("cardinal");
    audio.current ??= Object.assign(new Audio(SONG), { volume: 0.6 });
    const a = audio.current;
    a.currentTime = 0;
    a.onended = () => setSinging(false);
    a.play().then(
      () => setSinging(true),
      () => setSinging(false)
    );
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={sing}
      className={`cardinal${flight ? " is-flying" : ""}${singing ? " is-singing" : ""}`}
      style={
        {
          top: top ?? 0,
          visibility: top === null ? "hidden" : undefined,
          "--fly-ms": `${flight?.ms ?? 1400}ms`,
        } as React.CSSProperties
      }
      aria-label="A cardinal. Click to hear it sing"
      data-tip="cardinals stay put. I didn't. ♪"
    >
      <svg key={flight?.key} viewBox="0 0 32 28" width="32" height={BIRD_H} aria-hidden="true">
        <path d="M3 17l7-3 1.2 5L4 22z" fill="#9e1b2f" />
        <ellipse cx="16" cy="16" rx="8" ry="6.5" fill="#d7263d" />
        <g className="cardinal-head">
          <path d="M19.4 7.4L17.6 1.6l5.6 4.8z" fill="#d7263d" />
          <circle cx="22" cy="10" r="4.6" fill="#d7263d" />
          <path d="M22.6 8.4c2.6.2 3.4 1.4 3.2 2.8.2 1.6-1 2.4-3 2.2-.8-1.4-.9-3.4-.2-5z" fill="#151515" />
          <path className="beak-top" d="M25.4 9.4L30 11l-4.6.4z" fill="#f4a259" />
          <path className="beak-bottom" d="M25.4 11.4L30 11l-4.6 1.6z" fill="#e08e45" />
          <circle cx="23.5" cy="10.1" r=".7" fill="#f5f0e6" />
        </g>
        <path className="cardinal-wing" d="M12 13c5-2 9 0 9.6 2.8-3.6 3.4-7.6 3.6-10.6 1.6z" fill="#b51d32" />
        <path className="cardinal-legs" d="M15 22l-.8 5M18.2 22l.6 5" stroke="#7a5a45" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </button>
  );
}
