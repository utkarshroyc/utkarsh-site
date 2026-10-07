"use client";

import { useEffect, useRef } from "react";
import { useWeather } from "@/lib/weather";

// The page quietly mirrors Brooklyn's sky: rain, snow, fog or a storm drawn on a canvas
// behind the content. Clear and cloudy skies draw nothing.

type Drop = { x: number; y: number; len: number; speed: number; drift: number; r: number };

export default function WeatherFX() {
  const weather = useWeather();
  const canvas = useRef<HTMLCanvasElement>(null);
  const sky = weather?.sky;

  useEffect(() => {
    const el = canvas.current;
    if (!el || !sky || !["rain", "snow", "storm"].includes(sky)) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const snow = sky === "snow";

    let w = 0;
    let h = 0;
    let drops: Drop[] = [];
    const resize = () => {
      const dpr = Math.min(2, devicePixelRatio || 1);
      w = innerWidth;
      h = innerHeight;
      el.width = w * dpr;
      el.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / (snow ? 9000 : sky === "storm" ? 4200 : 6500));
      drops = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        len: 8 + Math.random() * 14,
        speed: snow ? 0.4 + Math.random() * 0.8 : 7 + Math.random() * 6,
        drift: snow ? Math.random() * Math.PI * 2 : 0,
        r: 0.8 + Math.random() * 1.8,
      }));
    };
    resize();
    addEventListener("resize", resize);

    const rainColor = getComputedStyle(document.documentElement).getPropertyValue("--water").trim() || "#6fb0b8";
    let frame = 0;
    let flash = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (sky === "storm") {
        if (!still && Math.random() < 0.0025) flash = 1;
        if (flash > 0.01) {
          ctx.fillStyle = `rgba(228, 236, 224, ${flash * 0.06})`;
          ctx.fillRect(0, 0, w, h);
          flash *= 0.9;
        }
      }
      ctx.strokeStyle = rainColor;
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--snow").trim() || "rgba(228,236,224,.55)";
      ctx.globalAlpha = snow ? 1 : 0.22;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const d of drops) {
        if (snow) {
          ctx.moveTo(d.x + d.r, d.y);
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        } else {
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x - d.len * 0.18, d.y + d.len);
        }
        if (still) continue;
        if (snow) {
          d.drift += 0.01;
          d.x += Math.sin(d.drift) * 0.4;
          d.y += d.speed;
        } else {
          d.x -= d.speed * 0.18;
          d.y += d.speed;
        }
        if (d.y > h + 20) {
          d.y = -20;
          d.x = Math.random() * (w + 60);
        }
        if (d.x < -20) d.x = w + 10;
      }
      if (snow) ctx.fill();
      else ctx.stroke();
      ctx.globalAlpha = 1;
      if (!still) frame = requestAnimationFrame(draw);
    };
    draw();

    // Don't animate in a background tab.
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !still) frame = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [sky]);

  if (!sky) return null;
  return (
    <>
      <canvas ref={canvas} className="weather-fx" aria-hidden="true" />
      {sky === "fog" && (
        <>
          <div className="weather-fog" aria-hidden="true" />
          <div className="weather-fog front" aria-hidden="true" />
        </>
      )}
    </>
  );
}
