"use client";

import { geoCircle, geoNaturalEarth1, geoPath } from "d3-geo";
import { useEffect, useMemo, useRef, useState } from "react";
import Flicker from "./Flicker";
import { useMapFocus } from "./MapContext";
import { formatCoords } from "@/lib/coords";
import { findCritter, REVEAL_GANGA } from "@/lib/critters";
import { antisolarPoint } from "@/lib/sun";
import { downloadPostcard } from "@/lib/postcard";

type Marker = {
  name: string;
  years: string;
  note: string;
  label?: "left" | "right" | "below" | "above";
  x: number;
  y: number;
  at: number; // 0–1 along the route
};

type Pin = { lat: number; lon: number; t: number };

type Props = {
  w: number;
  h: number;
  scale: number;
  translate: [number, number];
  graticule: string;
  land: string;
  route: string;
  ganga: string;
  gangaLabel: [number, number];
  markers: Marker[];
  world: {
    scale: number;
    translate: [number, number];
    land: string;
    graticule: string;
    sphere: string;
    route: string;
    marks: [number, number][];
  };
};

type Mode = "home" | "readers";

const DRAW_MS = 2600;
// Where the dolphin surfaces: the Vikramshila Gangetic Dolphin Sanctuary near Bhagalpur.
const DOLPHIN_AT: [number, number] = [87.2, 25.1];
// City labels that step aside when the river is revealed.
const NEAR_GANGA = ["Lucknow", "Pune"];
// Night, plus two soft bands of twilight around it.
const NIGHT_RADII = [90, 93, 96];
const SECRET = "ganga";
const PINNED_KEY = "dropped-pin";

function labelProps(m: Marker) {
  const side = m.label ?? "right";
  return {
    x: side === "left" ? -8 : side === "right" ? 8 : 0,
    y: side === "below" ? 16 : side === "above" ? -9 : 4,
    textAnchor: (side === "left" ? "end" : side === "right" ? "start" : "middle") as "end" | "start" | "middle",
  };
}

function readStored(): Pin | null {
  try {
    return JSON.parse(localStorage.getItem(PINNED_KEY) ?? "null");
  } catch {
    return null;
  }
}

export default function MapView(p: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("home");
  const [switched, setSwitched] = useState(false);
  const switchTo = (m: Mode) => {
    if (m === mode) return;
    setSwitched(true);
    setMode(m);
  };
  const [drawn, setDrawn] = useState(false);
  const [river, setRiver] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const { active, setActive } = useMapFocus();
  const focus = hover ?? active;

  // Visitor pins
  const [pinsOn, setPinsOn] = useState(false);
  const [pins, setPins] = useState<Pin[]>([]);
  // Safe to read on first render: "mine" only affects the readers view, which starts hidden.
  const [mine, setMine] = useState<Pin | null>(() => (typeof window === "undefined" ? null : readStored()));
  const [draft, setDraft] = useState<[number, number] | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  // Status messages fade back to the cursor readout after a few seconds.
  useEffect(() => {
    if (!status || status === "Dropping…") return;
    const t = setTimeout(() => setStatus(null), 5000);
    return () => clearTimeout(t);
  }, [status]);

  const homeProj = useMemo(
    () => geoNaturalEarth1().scale(p.scale).translate(p.translate),
    [p.scale, p.translate]
  );
  const globeProj = useMemo(
    () => geoNaturalEarth1().scale(p.world.scale).translate(p.world.translate),
    [p.world.scale, p.world.translate]
  );
  const proj = mode === "home" ? homeProj : globeProj;

  // Night shadow, computed on the client (it depends on the current time) and
  // refreshed every minute.
  const [night, setNight] = useState<{ home: string[]; globe: string[] } | null>(null);
  useEffect(() => {
    const homePath = geoPath(homeProj);
    const globePath = geoPath(globeProj);
    const update = () => {
      const center = antisolarPoint();
      const circles = NIGHT_RADII.map((r) => geoCircle().center(center).radius(r)());
      setNight({
        home: circles.map((c) => homePath(c) ?? ""),
        globe: circles.map((c) => globePath(c) ?? ""),
      });
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [homeProj, globeProj]);

  useEffect(() => {
    fetch("/api/pins")
      .then((r) => r.json())
      .then((d) => {
        setPinsOn(Boolean(d.enabled));
        setPins(d.pins ?? []);
      })
      .catch(() => {});
  }, []);

  // Draw the route the first time the map scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Easter egg: type "ganga" anywhere to reveal the river.
  useEffect(() => {
    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      if (e.key.length !== 1) return;
      typed = (typed + e.key.toLowerCase()).slice(-SECRET.length);
      if (typed === SECRET) {
        setMode("home");
        setRiver(true);
        ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
    const reveal = () => {
      setMode("home");
      setRiver(true);
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(REVEAL_GANGA, reveal);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(REVEAL_GANGA, reveal);
    };
  }, []);

  const toLonLat = (e: React.PointerEvent<SVGSVGElement> | React.MouseEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const ll = proj.invert?.([((e.clientX - r.left) / r.width) * p.w, ((e.clientY - r.top) / r.height) * p.h]);
    return ll && Number.isFinite(ll[0]) && Number.isFinite(ll[1]) ? ll : null;
  };

  // Crosshair readout: invert the projection under the pointer.
  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const ll = toLonLat(e);
    setCursor(ll ? formatCoords(ll[1], ll[0]) : null);
  };

  const onClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (mode !== "readers" || mine) return;
    const ll = toLonLat(e);
    if (ll) {
      setDraft([ll[0], ll[1]]);
      setStatus(null);
    }
  };

  const drop = async () => {
    if (!draft) return;
    setStatus("Dropping…");
    const res = await fetch("/api/pins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lon: draft[0], lat: draft[1] }),
    }).catch(() => null);
    const data = await res?.json().catch(() => null);
    if (!res?.ok || !data?.pin) {
      setStatus(data?.error ?? "Couldn't save that. Try again later.");
      return;
    }
    setPins((ps) => [data.pin, ...ps]);
    setMine(data.pin);
    setDraft(null);
    setStatus("Pinned. Thanks for stopping by!");
    try {
      localStorage.setItem(PINNED_KEY, JSON.stringify(data.pin));
    } catch {}
  };

  const project = (lon: number, lat: number) => {
    const xy = globeProj([lon, lat]);
    return xy ? { x: +xy[0].toFixed(1), y: +xy[1].toFixed(1) } : null;
  };

  const dolphinXY = homeProj(DOLPHIN_AT);
  const postcard = () => {
    if (!mine || !mineXY) return;
    const readers = pins
      .filter((pin) => pin.t !== mine.t)
      .map((pin) => project(pin.lon, pin.lat))
      .filter((xy): xy is { x: number; y: number } => xy !== null);
    downloadPostcard({
      mapW: p.w,
      mapH: p.h,
      land: p.world.land,
      graticule: p.world.graticule,
      sphere: p.world.sphere,
      route: p.world.route,
      marks: p.world.marks,
      readers,
      you: mineXY,
      lat: mine.lat,
      lon: mine.lon,
    }).then(() => setStatus("Postcard saved ✓"));
  };

  const card = mode === "home" ? p.markers.find((m) => m.name === focus) : undefined;
  const draftXY = draft ? project(draft[0], draft[1]) : null;
  const mineXY = mine ? project(mine.lon, mine.lat) : null;

  let caption: React.ReactNode;
  if (mode === "home") caption = <>Fig. 1 · Places I&apos;ve called home.</>;
  else if (mine)
    caption = (
      <>
        Fig. 2 · Where people are reading from. You&apos;re the pink one.{" "}
        <button type="button" className="link-btn" onClick={postcard}>
          Get a postcard ↓
        </button>
      </>
    );
  else if (draft)
    caption = (
      <>
        Drop your pin here?{" "}
        <button type="button" className="link-btn" onClick={drop}>
          Yes, pin me
        </button>{" "}
        <button type="button" className="link-btn muted" onClick={() => setDraft(null)}>
          Cancel
        </button>
      </>
    );
  else caption = <>Fig. 2 · Where people are reading from. Click the map to add yourself.</>;

  return (
    <figure className="map">
      {pinsOn && (
        <div className="map-tabs" role="tablist" aria-label="Map view">
          <button role="tab" aria-selected={mode === "home"} onClick={() => switchTo("home")}>
            Places I&apos;ve lived
          </button>
          <button role="tab" aria-selected={mode === "readers"} onClick={() => switchTo("readers")}>
            Where readers are <span className="count">{pins.length}</span>
          </button>
        </div>
      )}
      <div
        ref={ref}
        className={`world-wrap${drawn ? " is-drawn" : ""}${river ? " has-river" : ""} mode-${mode}`}
      >
        <svg
          key={mode}
          viewBox={`0 0 ${p.w} ${p.h}`}
          className={`world${switched ? " swap-in" : ""}`}
          role="img"
          aria-labelledby="world-title"
          onPointerMove={onMove}
          onPointerLeave={() => setCursor(null)}
          onClick={onClick}
          style={{ "--draw-ms": `${DRAW_MS}ms` } as React.CSSProperties}
        >
          <title id="world-title">
            {mode === "home"
              ? `Map of places lived: ${p.markers.map((m) => m.name).join(", ")}`
              : `World map of ${pins.length} reader pins`}
          </title>
          <defs>
            <clipPath id="frame">
              <rect width={p.w} height={p.h} />
            </clipPath>
            <mask id="route-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width={p.w} height={p.h}>
              <path d={p.route} className="route-mask" pathLength={1} />
            </mask>
          </defs>

          {mode === "home" ? (
            <g clipPath="url(#frame)">
              <path d={p.graticule} className="graticule" />
              <path d={p.land} className="land" />
              {night?.home.map((d, i) => <path key={i} d={d} className="night" />)}
              <path d={p.ganga} className="ganga" pathLength={1} />
              <text x={p.gangaLabel[0] + 6} y={p.gangaLabel[1] + 14} className="ganga-label">
                Ganga
              </text>
              {dolphinXY && (
                <g
                  className="dolphin"
                  transform={`translate(${dolphinXY[0].toFixed(1)} ${dolphinXY[1].toFixed(1)})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    findCritter("dolphin");
                    setStatus("A Ganga river dolphin! They're nearly blind and navigate by echolocation.");
                  }}
                >
                  <title>A Ganga river dolphin</title>
                  <circle r={16} className="hit" />
                  <circle r={9} className="beacon" />
                  <ellipse rx={7} ry={2.2} cy={5} className="ripple" />
                  <ellipse rx={7} ry={2.2} cy={5} className="ripple late" />
                  <circle cx={-3} cy={3} r={0.9} className="splash" />
                  <circle cx={0} cy={2} r={1.1} className="splash" />
                  <circle cx={3} cy={3} r={0.9} className="splash" />
                  <g className="dolphin-body">
                    <path d="M-7 1.5C-4-3.5 3-4.5 6.5-1l4.5-.6-4.2 1.9C4 3.4-3 4-7 1.5z" />
                    <path d="M-1-2.8l1.4-2.6 1 2.4z" />
                    <path d="M-7 1.5l-3-2.4.6 3.4z" />
                  </g>
                </g>
              )}
              <path d={p.route} className="route" mask="url(#route-reveal)" />
              {p.markers.map((m) => (
                <g
                  key={m.name}
                  className={`place${focus === m.name ? " is-active" : ""}${NEAR_GANGA.includes(m.name) ? " near-ganga" : ""}`}
                  transform={`translate(${m.x} ${m.y})`}
                  style={{ "--delay": `${Math.round(m.at * DRAW_MS)}ms` } as React.CSSProperties}
                  tabIndex={0}
                  onPointerEnter={() => setHover(m.name)}
                  onPointerLeave={() => setHover(null)}
                  onFocus={() => setActive(m.name)}
                  onBlur={() => setActive(null)}
                >
                  <circle r={11} className="hit" />
                  <circle r={7} className="ring" />
                  <path d="M-4 -4L4 4M4 -4L-4 4" />
                  <text {...labelProps(m)}>{m.name}</text>
                </g>
              ))}
            </g>
          ) : (
            <g className="globe">
              <path d={p.world.sphere} className="sphere" />
              <path d={p.world.graticule} className="graticule" />
              <path d={p.world.land} className="land" />
              {night?.globe.map((d, i) => <path key={i} d={d} className="night" />)}
              {pins.map((pin, i) => {
                const xy = project(pin.lon, pin.lat);
                return xy && <circle key={`${pin.t}-${i}`} cx={xy.x} cy={xy.y} r={2.4} className="reader" />;
              })}
              {mineXY && <circle cx={mineXY.x} cy={mineXY.y} r={4} className="reader is-mine" />}
              {draftXY && (
                <g transform={`translate(${draftXY.x} ${draftXY.y})`} className="draft">
                  <circle r={9} className="ring" />
                  <circle r={4} />
                </g>
              )}
            </g>
          )}
        </svg>
        <Flicker />
        {card && (
          <div
            className="map-card"
            style={{ left: `${(card.x / p.w) * 100}%`, top: `${(card.y / p.h) * 100}%` }}
            aria-hidden="true"
          >
            <strong>{card.name}</strong>
            <span className="meta">{card.years}</span>
            <span>{card.note}</span>
          </div>
        )}
      </div>
      <figcaption className="meta map-caption">
        <span>{caption}</span>
        <span aria-live="polite">
          {status ?? cursor ?? (river && mode === "home" ? "You found the river." : "")}
        </span>
      </figcaption>
    </figure>
  );
}
