"use client";

import { useEffect, useRef, useState } from "react";

// A cardinal that perches on the current section's heading line and hops to the next
// one as you scroll. A nod to "tuscaloosa, or something like it".

const ESSAY = "https://slightlyunfinished.substack.com/p/tuscaloosa-or-something-like-it";
const BIRD_H = 28;

export default function Cardinal() {
  const [top, setTop] = useState<number | null>(null);
  const [hopping, setHopping] = useState(false);
  const last = useRef<number | null>(null);

  useEffect(() => {
    const headings = () => [...document.querySelectorAll<HTMLElement>("main section > h2.label")];
    let frame = 0;
    const place = () => {
      frame = 0;
      const hs = headings();
      if (!hs.length) return;
      const line = window.scrollY + window.innerHeight * 0.45;
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      const current = atBottom ? hs[hs.length - 1] : (hs.filter((h) => h.offsetTop <= line).pop() ?? hs[0]);
      const next = current.offsetTop + current.offsetHeight - BIRD_H + 1;
      if (next !== last.current) {
        if (last.current !== null) {
          setHopping(true);
          setTimeout(() => setHopping(false), 650);
        }
        last.current = next;
        setTop(next);
      }
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
    };
  }, []);

  if (top === null) return null;
  return (
    <a
      href={ESSAY}
      target="_blank"
      rel="noopener noreferrer"
      className={`cardinal${hopping ? " is-hopping" : ""}`}
      style={{ top }}
      aria-label="A cardinal. Read “tuscaloosa, or something like it”"
      data-tip="cardinals stay put. I didn't."
    >
      <svg viewBox="0 0 32 28" width="32" height={BIRD_H} aria-hidden="true">
        <path d="M3 17l7-3 1.2 5L4 22z" fill="#9e1b2f" />
        <ellipse cx="16" cy="16" rx="8" ry="6.5" fill="#d7263d" />
        <path d="M12 13c5-2 9 0 9.6 2.8-3.6 3.4-7.6 3.6-10.6 1.6z" fill="#b51d32" />
        <g className="cardinal-head">
          <path d="M19.4 7.4L17.6 1.6l5.6 4.8z" fill="#d7263d" />
          <circle cx="22" cy="10" r="4.6" fill="#d7263d" />
          <path d="M22.6 8.4c2.6.2 3.4 1.4 3.2 2.8.2 1.6-1 2.4-3 2.2-.8-1.4-.9-3.4-.2-5z" fill="#151515" />
          <path d="M25.4 9.4L30 11l-4.6 1.6z" fill="#f4a259" />
          <circle cx="23.5" cy="10.1" r=".7" fill="#f5f0e6" />
        </g>
        <path d="M15 22l-.8 5M18.2 22l.6 5" stroke="#7a5a45" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </a>
  );
}
