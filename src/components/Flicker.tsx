"use client";

import { useEffect, useRef, useState } from "react";
import { findCritter } from "@/lib/critters";

// A Northern Flicker (the yellowhammer, Alabama's state bird) clinging to the edge of the
// map like a tree trunk. Every so often it drums; click it to hear the real thing.
// Drum: Jonathon Jongsma, xeno-canto XC254591, CC BY-SA 4.0 (trimmed). Credited in the footer.

const DRUM = "/sounds/flicker.m4a";

export default function Flicker() {
  const [drumming, setDrumming] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);
  const stop = useRef<ReturnType<typeof setTimeout>>(undefined);

  const drum = (ms = 1200) => {
    setDrumming(true);
    clearTimeout(stop.current);
    stop.current = setTimeout(() => setDrumming(false), ms);
  };

  // Silent drumming now and then, so people notice it.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t: ReturnType<typeof setTimeout>;
    const schedule = () => {
      t = setTimeout(() => {
        drum();
        schedule();
      }, 20_000 + Math.random() * 20_000);
    };
    t = setTimeout(() => {
      drum();
      schedule();
    }, 6000);
    return () => {
      clearTimeout(t);
      clearTimeout(stop.current);
    };
  }, []);

  const warm = () => {
    audio.current ??= Object.assign(new Audio(DRUM), { volume: 0.7, preload: "auto" });
  };

  const onClick = () => {
    findCritter("flicker");
    warm();
    audio.current!.currentTime = 0;
    audio.current!.play().catch(() => {});
    drum(1300);
  };

  return (
    <button
      type="button"
      className={`flicker${drumming ? " is-drumming" : ""}`}
      onClick={onClick}
      onPointerEnter={warm}
      onFocus={warm}
      aria-label="A Northern Flicker. Click to hear it drum"
      data-tip="a yellowhammer, a long way from Alabama"
    >
      <svg viewBox="0 0 24 34" width="24" height="34" aria-hidden="true">
        {/* tail braced against the trunk */}
        <path d="M5 24l-3 9 5-4z" fill="#3b2f25" />
        <path d="M4 27l1.6-3.2 1.2 2.4z" fill="#f2c94c" />
        {/* barred brown back and spotted belly */}
        <path d="M6 10c-2 4-2 10 0 15 3 1 7 0 9-3 1.6-4 .8-9-1.5-12z" fill="#a07c5a" />
        <path d="M7 14h6M6.6 17h7M7 20h6" stroke="#4a3a2c" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M12.4 13c1.6 3 1.8 6.6.6 9.6-1.2 1-2.4 1.2-3.4 1" fill="#efe3cf" />
        <circle cx="12" cy="17" r=".7" fill="#3b2f25" />
        <circle cx="11.2" cy="20" r=".7" fill="#3b2f25" />
        <path d="M9.6 12.4c1.6.2 3 .9 3.8 1.9" stroke="#1d1712" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <g className="flicker-head">
          <circle cx="11" cy="7.4" r="4.2" fill="#c9b79d" />
          <path d="M7.4 5.6c1.4-2.4 4.6-3 6.6-1.4" stroke="#8d8a86" strokeWidth="2.2" fill="none" />
          <path d="M7.2 8.4l1.8-.8.4 1.6z" fill="#d7263d" />
          <path d="M14.6 7l6.8 1.2-6.6 1.2z" fill="#2a2420" />
          <circle cx="12.6" cy="6.6" r=".75" fill="#151515" />
        </g>
        {/* feet gripping the edge */}
        <path d="M15 22.4l3.2 1M15 24.6l3.2.6" stroke="#6b5a4a" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </button>
  );
}
