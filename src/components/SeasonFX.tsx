"use client";

import { useEffect, useRef } from "react";

// Brooklyn's season, drifting down the page: autumn leaves or spring petals, a few at a
// time as you scroll. Summer and winter stay clear (winter has the real snow).
// Preview with ?season=autumn|spring|none.

type Season = "autumn" | "spring" | null;

const LEAF = ["#c8553d", "#e09f3e", "#b5651d", "#d17a22", "#9c3d1c"];
const PETAL = ["#f7c5d4", "#fbe3ea", "#f2a7bd", "#fde9ef"];
const MAX_ON_SCREEN = 14;
const SCROLL_PER_SPAWN = 240;

function brooklynSeason(): Season {
  const pinned = new URLSearchParams(location.search).get("season");
  if (pinned === "autumn" || pinned === "spring") return pinned;
  if (pinned === "none") return null;
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", month: "numeric", day: "numeric" })
    .formatToParts(new Date());
  const m = Number(parts.find((p) => p.type === "month")?.value);
  const d = Number(parts.find((p) => p.type === "day")?.value);
  const md = m * 100 + d;
  if (md >= 922 && md <= 1220) return "autumn";
  if (md >= 320 && md <= 620) return "spring";
  return null;
}

const leafSvg = (color: string) =>
  `<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 2c-1.6 2.6-4.7 3.4-6.3 6.6-1.9 3.8-.4 8.3 3.4 10.2.9.4 1.9.7 2.9.7 1-.1 2-.3 2.9-.8 3.7-2 5-6.6 3-10.3C16.3 5.3 13.4 4.6 12 2z" fill="${color}"/><path d="M12 5v17" stroke="rgba(0,0,0,.25)" stroke-width="1"/></svg>`;
const petalSvg = (color: string) =>
  `<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 3c4 3 6 7 4.6 11.4C15.6 17.6 13.8 20 12 21c-1.8-1-3.6-3.4-4.6-6.6C6 10 8 6 12 3z" fill="${color}"/></svg>`;

export default function SeasonFX() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const season = brooklynSeason();
    const el = layer.current;
    if (!season || !el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const palette = season === "autumn" ? LEAF : PETAL;
    const spawn = () => {
      if (el.childElementCount >= MAX_ON_SCREEN) return;
      const fall = document.createElement("span");
      fall.className = "season-fall";
      const size = season === "autumn" ? 14 + Math.random() * 12 : 9 + Math.random() * 7;
      const duration = 8 + Math.random() * 6;
      fall.style.cssText = `left:${Math.random() * 100}%;width:${size}px;height:${size}px;animation-duration:${duration}s`;
      const sway = document.createElement("span");
      sway.className = "season-sway";
      sway.style.animationDuration = `${2.5 + Math.random() * 2}s`;
      const color = palette[Math.floor(Math.random() * palette.length)];
      sway.innerHTML = season === "autumn" ? leafSvg(color) : petalSvg(color);
      fall.appendChild(sway);
      fall.addEventListener("animationend", () => fall.remove(), { once: true });
      el.appendChild(fall);
    };

    // A couple on arrival, then more as you scroll.
    const intro = [600, 1800, 3200].map((t) => setTimeout(spawn, t));
    let last = scrollY;
    let travelled = 0;
    const onScroll = () => {
      travelled += Math.abs(scrollY - last);
      last = scrollY;
      while (travelled > SCROLL_PER_SPAWN) {
        travelled -= SCROLL_PER_SPAWN;
        spawn();
      }
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      intro.forEach(clearTimeout);
      removeEventListener("scroll", onScroll);
      el.replaceChildren();
    };
  }, []);

  return <div ref={layer} className="season-fx" aria-hidden="true" />;
}
