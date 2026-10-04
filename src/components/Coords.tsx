"use client";

import { geoDistance, geoInterpolate } from "d3-geo";
import { useEffect, useState } from "react";
import { places } from "@/lib/content";
import { useMapFocus } from "./MapContext";
import { formatCoords } from "@/lib/coords";

// Scrolling down travels back in time along the route: Brooklyn → … → Lucknow,
// mirroring the reverse-chronological work list.
const stops = [...places].reverse();
const legs = stops.slice(1).map((p, i) => geoDistance(stops[i].at, p.at));
const total = legs.reduce((a, b) => a + b, 0);
const NEAR = 0.015; // within 1.5% of the journey counts as "at" a city

function locate(t: number) {
  let d = t * total;
  for (let i = 0; i < legs.length; i++) {
    if (d <= legs[i] || i === legs.length - 1) {
      const f = Math.min(1, d / legs[i]);
      const [lon, lat] = geoInterpolate(stops[i].at, stops[i + 1].at)(f);
      const nearStart = (f * legs[i]) / total < NEAR;
      const nearEnd = ((1 - f) * legs[i]) / total < NEAR;
      const name = nearStart ? stops[i].name : nearEnd ? stops[i + 1].name : "En route";
      return { text: formatCoords(lat, lon), name };
    }
    d -= legs[i];
  }
  return { text: "", name: "" };
}

export default function Coords() {
  const [state, setState] = useState(() => ({ ...locate(0), visible: false }));
  const { active, years } = useMapFocus();
  // Hovering a work row jumps the readout to that city, since the map is usually off-screen.
  const pinned = places.find((p) => p.name === active);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const t = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setState({ ...locate(t), visible: window.scrollY > 240 });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={`coords meta${state.visible || pinned ? " is-visible" : ""}${pinned ? " is-pinned" : ""}`}
      aria-hidden="true"
    >
      <span className="dot" />
      {pinned
        ? `${formatCoords(pinned.at[1], pinned.at[0])} · ${pinned.name} · ${(years ?? pinned.years).replace("—", "–")}`
        : `${state.text} · ${state.name}`}
    </div>
  );
}
