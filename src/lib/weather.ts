"use client";

import { useEffect, useState } from "react";

// Live Brooklyn weather from Open-Meteo (free, no key), fetched once per page view and
// shared by everything that reacts to it. Append ?weather=rain|snow|fog|storm|clear to
// the URL to preview an effect regardless of the real sky.

export type Sky = "clear" | "cloudy" | "fog" | "rain" | "snow" | "storm";
export type Weather = { c: number; f: number; text: string; sky: Sky; day: boolean };

const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=40.68&longitude=-73.94&current=temperature_2m,weather_code,is_day";

function classify(code: number, day: boolean): { text: string; sky: Sky } {
  if (code === 0) return { text: day ? "clear skies" : "clear night", sky: "clear" };
  if (code <= 2) return { text: "partly cloudy", sky: "cloudy" };
  if (code === 3) return { text: "overcast", sky: "cloudy" };
  if (code <= 48) return { text: "foggy", sky: "fog" };
  if (code <= 57) return { text: "drizzle", sky: "rain" };
  if (code <= 67) return { text: "raining", sky: "rain" };
  if (code <= 77) return { text: "snowing", sky: "snow" };
  if (code <= 82) return { text: "showers", sky: "rain" };
  if (code <= 86) return { text: "snow showers", sky: "snow" };
  return { text: "thunderstorms", sky: "storm" };
}

const PREVIEW: Record<string, number> = { clear: 0, cloudy: 3, fog: 45, rain: 63, snow: 73, storm: 95 };

let request: Promise<Weather | null> | null = null;

function load(): Promise<Weather | null> {
  request ??= fetch(URL)
    .then((r) => r.json())
    .then(({ current: c }) => {
      if (typeof c?.temperature_2m !== "number") return null;
      const day = c.is_day === 1;
      const preview = new URLSearchParams(location.search).get("weather");
      const code = preview && preview in PREVIEW ? PREVIEW[preview] : c.weather_code;
      return {
        c: Math.round(c.temperature_2m),
        f: Math.round(c.temperature_2m * 1.8 + 32),
        day,
        ...classify(code, day),
      };
    })
    .catch(() => null);
  return request;
}

export function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);
  useEffect(() => {
    let live = true;
    load().then((w) => live && setWeather(w));
    return () => {
      live = false;
    };
  }, []);
  return weather;
}
