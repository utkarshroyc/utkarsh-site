"use client";

import { useEffect, useRef, useState } from "react";

// Rio, my golden retriever. He runs along the bottom of the screen whenever the cardinal
// takes off, and plays with the turtle down by the footer.

export const CARDINAL_FLIGHT = "cardinal-flight";
const COOLDOWN_MS = 20_000;
const RUN_MS = 3400;

function Dog({ tongue = false }: { tongue?: boolean }) {
  return (
    <svg viewBox="0 0 60 40" width="60" height="40" aria-hidden="true" className="rio-svg">
      <path className="rio-tail" d="M12 17c-5-1-9-5-10-10 1 0 2.6.6 3.6 1.8C7.6 10.6 9.8 13 13 14.6z" />
      <g className="rio-legs back">
        <path className="leg a" d="M17 24v12" />
        <path className="leg b" d="M20.5 24v12" />
      </g>
      <ellipse className="rio-coat" cx="26" cy="20" rx="15" ry="8" />
      <path className="rio-feather" d="M14 25c3 3.4 8 4 12 3.2" />
      <g className="rio-legs front">
        <path className="leg a" d="M35 25v11" />
        <path className="leg b" d="M38.5 25v11" />
      </g>
      <ellipse className="rio-coat" cx="37" cy="20.5" rx="7" ry="7.5" />
      <g className="rio-head">
        <circle className="rio-coat" cx="44" cy="12" r="7" />
        <path className="rio-coat" d="M47.5 10.2c4.2-.2 8 1.4 9.2 3.6-1 2.2-5 2.8-9.2 2.6z" />
        <circle cx="56.4" cy="13.9" r="1.3" className="rio-dark" />
        <circle cx="46.4" cy="10.4" r="0.95" className="rio-dark" />
        <path className="rio-ear" d="M41 7.4c-3.4 1-4.6 6.4-2.4 10.6 2.2 0 3.8-3.2 3.8-6.4z" />
        {tongue && <path className="rio-tongue" d="M50.6 16.4c-.2 2.2.8 3.6 2 3.6s1.6-1.2 1.2-3z" />}
        <path className="rio-collar" d="M38.6 15c2.2 2.6 6.2 3.2 8.4 1.2" />
        <circle cx="42.6" cy="18.2" r="1.3" className="rio-tag" />
      </g>
    </svg>
  );
}

// Runs across the bottom of the screen when the cardinal flies (and once, soon after arrival).
export function RioRunner() {
  const [run, setRun] = useState<{ key: number; dir: 1 | -1 } | null>(null);
  const last = useRef(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let done: ReturnType<typeof setTimeout>;
    const go = () => {
      const now = Date.now();
      if (now - last.current < COOLDOWN_MS) return;
      last.current = now;
      setRun({ key: now, dir: Math.random() < 0.7 ? 1 : -1 });
      clearTimeout(done);
      done = setTimeout(() => setRun(null), RUN_MS + 200);
    };
    const intro = setTimeout(go, 7000);
    window.addEventListener(CARDINAL_FLIGHT, go);
    return () => {
      clearTimeout(intro);
      clearTimeout(done);
      window.removeEventListener(CARDINAL_FLIGHT, go);
    };
  }, []);

  if (!run) return null;
  return (
    <div
      key={run.key}
      className={`rio-runner${run.dir === -1 ? " leftward" : ""}`}
      style={{ animationDuration: `${RUN_MS}ms` }}
      aria-hidden="true"
    >
      <div className="rio is-running">
        <Dog tongue />
      </div>
    </div>
  );
}

// Trots along the footer with the turtle, play-bowing now and then. Click for a wag and a heart.
export function RioFooter() {
  const [happy, setHappy] = useState(0);
  return (
    <div className="rio-track">
    <div className="amble rio-amble">
    <button
      type="button"
      className={`rio-footer${happy ? " is-happy" : ""}`}
      onClick={() => setHappy((n) => n + 1)}
      aria-label="Rio, my golden retriever"
      data-tip="Rio · still chasing birds"
    >
      <span className="rio-face">
        <span className="rio is-playing">
          <Dog tongue={happy > 0} />
        </span>
      </span>
      {happy > 0 && (
        <svg key={happy} className="rio-heart" viewBox="0 0 24 22" width="16" height="15" aria-hidden="true">
          <path d="M12 21C5 15.4 1 11.6 1 7.2 1 3.8 3.6 1.2 6.8 1.2c2.2 0 4 1.2 5.2 3 1.2-1.8 3-3 5.2-3 3.2 0 5.8 2.6 5.8 6 0 4.4-4 8.2-11 13.8z" />
        </svg>
      )}
    </button>
    </div>
    </div>
  );
}
