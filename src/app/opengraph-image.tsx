import { readFile } from "node:fs/promises";
import path from "node:path";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { ImageResponse } from "next/og";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import land110 from "world-atlas/land-110m.json";
import { places } from "@/lib/content";

// The link-preview card (LinkedIn, iMessage, Slack…), rendered at build time.

export const alt = "Utkarsh Roy Choudhury: geographer turned climate operator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const C = {
  paper: "#0d1913",
  ink: "#e4ece0",
  ink2: "#a7b8a6",
  ink3: "#6e8571",
  rule: "#223a2c",
  land: "#14261c",
  coast: "#2f5a40",
  accent: "#ff8ab8",
};

// Google Fonts serves TTF to clients that don't advertise woff2, which is what Satori needs.
async function font(family: string, text: string) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)
  ).text();
  const url = css.match(/src: url\((.+?)\) format/)?.[1];
  if (!url) throw new Error(`No font file for ${family}`);
  return (await fetch(url)).arrayBuffer();
}

function mapSvg(w: number, h: number) {
  const topo = land110 as unknown as Topology<{ land: GeometryCollection }>;
  const land = feature(topo, topo.objects.land);
  const projection = geoNaturalEarth1().fitExtent(
    [[0, 10], [w, h - 10]],
    { type: "MultiPoint", coordinates: [[-112, 12], [94, 12], [-112, 58], [94, 58]] }
  );
  // Coastlines only: the card renderer mis-fills land shapes that run off-canvas.
  const path = geoPath(projection);
  const route = path({ type: "LineString", coordinates: places.map((p) => p.at) }) ?? "";
  const marks = places
    .map((p) => {
      const [x, y] = projection(p.at)!;
      return `<path d="M${x - 7} ${y - 7}L${x + 7} ${y + 7}M${x + 7} ${y - 7}L${x - 7} ${y + 7}" stroke="${C.accent}" stroke-width="3.5" stroke-linecap="round"/>`;
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <path d="${path(land)}" fill="none" stroke="${C.coast}" stroke-width="1.4"/>
    <path d="${route}" fill="none" stroke="${C.accent}" stroke-width="3" stroke-dasharray="7 9" stroke-linecap="round"/>
    ${marks}
  </svg>`;
}

export default async function Image() {
  const name = "Utkarsh Roy Choudhury";
  const line = "Geographer turned climate operator.";
  const meta = "40.68° N, 73.94° W · BROOKLYN";
  const tags = "CHAPTERS · WRITING · PAPERS";

  const [display, mono] = await Promise.all([
    readFile(path.join(process.cwd(), "src/fonts/le-murmure.otf")),
    font("DM+Mono", meta + tags),
  ]);
  const map = `data:image/svg+xml;base64,${Buffer.from(mapSvg(1200, 330)).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: C.paper,
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={map} width={1200} height={330} style={{ position: "absolute", left: 0, bottom: 0, opacity: 0.9 }} />
        <div style={{ display: "flex", flexDirection: "column", padding: "64px 80px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "DM Mono",
              fontSize: 22,
              letterSpacing: 1,
              color: C.ink3,
              borderBottom: `1.5px solid ${C.rule}`,
              paddingBottom: 18,
            }}
          >
            <span>{meta}</span>
            <span style={{ color: C.accent }}>{tags}</span>
          </div>
          <div style={{ fontFamily: "Le Murmure", fontSize: 112, color: C.ink, marginTop: 36, lineHeight: 1 }}>
            {name}
          </div>
          <div style={{ fontFamily: "Le Murmure", fontSize: 46, color: C.ink2, marginTop: 12 }}>{line}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Le Murmure", data: display, style: "normal", weight: 400 },
        { name: "DM Mono", data: mono, style: "normal", weight: 400 },
      ],
    }
  );
}
