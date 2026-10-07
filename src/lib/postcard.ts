"use client";

import { formatCoords } from "./coords";

// A downloadable postcard for visitors who drop a pin: the world map with my route,
// every reader's pin, and theirs, drawn on a canvas in the browser. Nothing is uploaded.

type Pt = { x: number; y: number };

export type PostcardInput = {
  mapW: number;
  mapH: number;
  land: string;
  graticule: string;
  sphere: string;
  route: string;
  marks: [number, number][];
  readers: Pt[];
  you: Pt;
  lat: number;
  lon: number;
};

const C = {
  paper: "#0d1913",
  sea: "#102018",
  land: "#14261c",
  coast: "#4f8a62",
  rule: "#223a2c",
  ink: "#e4ece0",
  ink2: "#a7b8a6",
  ink3: "#6e8571",
  accent: "#ff8ab8",
  water: "#6fb0b8",
};

// next/font sets these variables on <body>, not <html>.
const cssFont = (v: string, fallback: string) =>
  getComputedStyle(document.body).getPropertyValue(v).trim() || fallback;

export async function downloadPostcard(p: PostcardInput) {
  const W = 1500;
  const H = 1000;
  const canvas = Object.assign(document.createElement("canvas"), { width: W, height: H });
  const ctx = canvas.getContext("2d")!;
  const display = cssFont("--font-display", "Georgia, serif");
  const mono = cssFont("--font-mono", "monospace");
  await Promise.all([document.fonts.load(`96px ${display}`), document.fonts.load(`24px ${mono}`)]).catch(() => {});

  // Card and inner border.
  ctx.fillStyle = C.paper;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = C.rule;
  ctx.lineWidth = 2;
  ctx.strokeRect(28, 28, W - 56, H - 56);

  // Greeting.
  ctx.fillStyle = C.accent;
  ctx.font = `26px ${mono}`;
  ctx.fillText("GREETINGS FROM", 70, 110);
  ctx.fillStyle = C.ink;
  ctx.font = `120px ${display}`;
  ctx.fillText(formatCoords(p.lat, p.lon), 64, 225);

  // Stamp with perforated edge, contour rings and a postmark.
  const sx = 1240;
  const sy = 60;
  const sw = 190;
  const sh = 220;
  ctx.fillStyle = C.ink;
  ctx.fillRect(sx, sy, sw, sh);
  ctx.fillStyle = C.paper;
  for (let x = sx; x <= sx + sw; x += 14) {
    for (const y of [sy, sy + sh]) {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  for (let y = sy; y <= sy + sh; y += 14) {
    for (const x of [sx, sx + sw]) {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.fillStyle = C.paper;
  ctx.fillRect(sx + 14, sy + 14, sw - 28, sh - 28);
  ctx.strokeStyle = C.coast;
  ctx.lineWidth = 2;
  for (let r = 1; r <= 4; r++) {
    ctx.beginPath();
    ctx.ellipse(sx + sw / 2, sy + 95, 16 * r, 11 * r, -0.3, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.fillStyle = C.accent;
  ctx.beginPath();
  ctx.arc(sx + sw / 2, sy + 95, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = C.ink;
  ctx.font = `34px ${display}`;
  ctx.textAlign = "center";
  ctx.fillText("Brooklyn", sx + sw / 2, sy + sh - 34);
  ctx.textAlign = "start";

  const date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase();
  ctx.save();
  ctx.translate(sx - 95, sy + 205);
  ctx.rotate(-0.25);
  ctx.strokeStyle = C.accent;
  ctx.globalAlpha = 0.85;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 70, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 56, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = C.accent;
  ctx.font = `17px ${mono}`;
  ctx.textAlign = "center";
  ctx.fillText(date, 0, 6);
  ctx.textAlign = "start";
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(75, -18 + i * 12);
    ctx.bezierCurveTo(115, -28 + i * 12, 140, -8 + i * 12, 190, -18 + i * 12);
    ctx.stroke();
  }
  ctx.restore();

  // The map.
  const mx = 70;
  const my = 300;
  const k = (W - 140) / p.mapW;
  ctx.save();
  ctx.translate(mx, my);
  ctx.scale(k, k);
  ctx.fillStyle = C.sea;
  ctx.fill(new Path2D(p.sphere));
  ctx.strokeStyle = C.rule;
  ctx.lineWidth = 0.6 / k;
  ctx.stroke(new Path2D(p.graticule));
  ctx.fillStyle = C.land;
  ctx.strokeStyle = C.coast;
  ctx.lineWidth = 1 / k;
  const land = new Path2D(p.land);
  ctx.fill(land);
  ctx.stroke(land);

  ctx.strokeStyle = C.accent;
  ctx.lineWidth = 2.2 / k;
  ctx.setLineDash([6 / k, 7 / k]);
  ctx.stroke(new Path2D(p.route));
  ctx.setLineDash([]);
  ctx.lineWidth = 2.2 / k;
  for (const [x, y] of p.marks) {
    const d = 4 / k;
    ctx.beginPath();
    ctx.moveTo(x - d, y - d);
    ctx.lineTo(x + d, y + d);
    ctx.moveTo(x + d, y - d);
    ctx.lineTo(x - d, y + d);
    ctx.stroke();
  }

  ctx.fillStyle = C.water;
  for (const r of p.readers) {
    ctx.beginPath();
    ctx.arc(r.x, r.y, 2.4 / k, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = C.accent;
  ctx.strokeStyle = C.paper;
  ctx.lineWidth = 2 / k;
  ctx.beginPath();
  ctx.arc(p.you.x, p.you.y, 6 / k, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = C.accent;
  ctx.lineWidth = 1.5 / k;
  ctx.beginPath();
  ctx.arc(p.you.x, p.you.y, 13 / k, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Footer.
  ctx.font = `22px ${mono}`;
  ctx.fillStyle = C.ink3;
  ctx.fillText("UTKARSHROY.XYZ · YOUR PIN IN PINK, MY ROUTE DASHED", 70, H - 62);
  ctx.textAlign = "right";
  ctx.fillStyle = C.ink2;
  ctx.font = `40px ${display}`;
  ctx.fillText("Wish you were here", W - 70, H - 58);

  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/png"));
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), { href: url, download: "postcard-from-utkarshroy-xyz.png" });
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
