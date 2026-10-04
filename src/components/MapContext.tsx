"use client";

import { createContext, useContext, useState } from "react";

// Shared "which city is highlighted" state between the map and the work rows.
// `years` carries the hovered row's own dates, which can differ from the city's overall span.
type Focus = { active: string | null; years: string | null };
const Ctx = createContext<Focus & { setActive: (p: string | null, years?: string) => void }>({
  active: null,
  years: null,
  setActive: () => {},
});

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [focus, setFocus] = useState<Focus>({ active: null, years: null });
  const setActive = (active: string | null, years?: string) => setFocus({ active, years: years ?? null });
  return <Ctx.Provider value={{ ...focus, setActive }}>{children}</Ctx.Provider>;
}

export const useMapFocus = () => useContext(Ctx);

// A list row that lights up its city on the map while hovered or focused.
export function PlaceRow({ place, years, children }: { place?: string; years: string; children: React.ReactNode }) {
  const { active, setActive } = useMapFocus();
  const on = place ? () => setActive(place, years) : undefined;
  const off = place ? () => setActive(null) : undefined;
  return (
    <li
      className={`row${place && active === place ? " is-active" : ""}`}
      onMouseEnter={on}
      onMouseLeave={off}
      onFocus={on}
      onBlur={off}
    >
      {children}
    </li>
  );
}
