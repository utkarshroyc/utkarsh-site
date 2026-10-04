"use client";

import { useEffect, useState } from "react";
import { useWeather } from "@/lib/weather";

// Live Brooklyn time and weather for the masthead. Rendered only after mount so the
// server and client markup match.

const time = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "numeric",
  minute: "2-digit",
});

export default function LocalConditions() {
  const [now, setNow] = useState<string | null>(null);
  const weather = useWeather();

  useEffect(() => {
    const tick = () => setNow(time.format(new Date()).toLowerCase());
    tick();
    const id = setInterval(tick, 30_000);
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
