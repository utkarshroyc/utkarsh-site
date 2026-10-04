"use client";

import { useEffect, useState } from "react";

// Live Brooklyn time and weather for the masthead. Rendered only after mount so the
// server and client markup match; weather comes from Open-Meteo (free, no key).

const LAT = 40.68;
const LON = -73.94;

const time = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "numeric",
  minute: "2-digit",
});

function describe(code: number, day: boolean) {
  if (code === 0) return day ? "clear skies" : "clear night";
  if (code <= 2) return "partly cloudy";
  if (code === 3) return "overcast";
  if (code <= 48) return "foggy";
  if (code <= 57) return "drizzle";
  if (code <= 67) return "raining";
  if (code <= 77) return "snowing";
  if (code <= 82) return "showers";
  if (code <= 86) return "snow showers";
  return "thunderstorms";
}

export default function LocalConditions() {
  const [now, setNow] = useState<string | null>(null);
  const [weather, setWeather] = useState<{ c: number; f: number; text: string } | null>(null);

  useEffect(() => {
    const tick = () => setNow(time.format(new Date()).toLowerCase());
    tick();
    const id = setInterval(tick, 30_000);

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code,is_day`
    )
      .then((r) => r.json())
      .then(({ current: c }) => {
        if (typeof c?.temperature_2m !== "number") return;
        setWeather({
          c: Math.round(c.temperature_2m),
          f: Math.round(c.temperature_2m * 1.8 + 32),
          text: describe(c.weather_code, c.is_day === 1),
        });
      })
      .catch(() => {});

    return () => clearInterval(id);
  }, []);

  if (!now) return null;
  return (
    <span className="conditions">
      {" · "}
      {now}
      {weather && (
        <span title={`${weather.f}°F`}>
          {" · "}
          {weather.c}°C, {weather.text}
        </span>
      )}
    </span>
  );
}
