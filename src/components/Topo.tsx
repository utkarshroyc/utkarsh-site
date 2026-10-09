"use client";

import { useEffect, useRef } from "react";

// Faint contour lines behind the masthead that drift slowly and lean toward the pointer.
// Rings are deterministic so server and client render identical markup.

type Peak = { x: number; y: number; rings: number; step: number; seed: number; depth: number };

const PEAKS: Peak[] = [
  { x: 880, y: 110, rings: 12, step: 17, seed: 1.3, depth: 18 },
  { x: 330, y: 360, rings: 8, step: 18, seed: 4.1, depth: 10 },
];

function ring(p: Peak, r: number, i: number) {
  let d = "";
  for (let k = 0; k <= 72; k++) {
    const a = (k / 72) * Math.PI * 2;
    const wobble =
      1 +
      0.16 * Math.sin(3 * a + p.seed + i * 0.25) +
      0.08 * Math.sin(5 * a - p.seed * 2 + i * 0.4) +
      0.05 * Math.cos(7 * a + i * 0.6);
    const x = p.x + Math.cos(a) * r * wobble * 1.4;
    const y = p.y + Math.sin(a) * r * wobble * 0.9;
    d += `${k ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d + "Z";
}

const RINGS = PEAKS.map((p) => Array.from({ length: p.rings }, (_, i) => ring(p, (i + 1) * p.step, i)));

export default function Topo() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Write each peak's transform directly; a CSS variable on the parent would
        // recalc styles for every contour path on every pointer move.
        const mx = e.clientX / innerWidth - 0.5;
        const my = e.clientY / innerHeight - 0.5;
        el.querySelectorAll<SVGGElement>(".topo-peak").forEach((g, i) => {
          const depth = PEAKS[i].depth;
          g.style.transform = `translate(${(-mx * depth).toFixed(2)}px, ${(-my * depth).toFixed(2)}px)`;
        });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="topo" aria-hidden="true">
      <svg ref={ref} viewBox="0 0 1280 460" preserveAspectRatio="xMidYMin slice">
        {PEAKS.map((p, pi) => (
          <g key={pi} className="topo-peak">
            <g className="topo-breathe">
              {RINGS[pi].map((d, i) => (
                <path key={i} d={d} className={i % 4 === 3 ? "index" : undefined} />
              ))}
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
