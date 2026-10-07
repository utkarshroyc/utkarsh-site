// Where the sun is directly overhead right now (low-precision almanac formula,
// good to well under a degree, which is plenty for drawing night on a small map).
export function subsolarPoint(date = new Date()): [number, number] {
  const rad = Math.PI / 180;
  const d = date.getTime() / 86_400_000 - 10_957.5; // days since J2000.0
  const g = (357.529 + 0.98560028 * d) * rad; // mean anomaly
  const q = 280.459 + 0.98564736 * d; // mean longitude
  const L = (q + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * rad; // ecliptic longitude
  const e = (23.439 - 0.00000036 * d) * rad; // obliquity
  const ra = Math.atan2(Math.cos(e) * Math.sin(L), Math.cos(L)) / rad;
  const dec = Math.asin(Math.sin(e) * Math.sin(L)) / rad;
  const gmst = (18.697374558 + 24.06570982441908 * d) % 24;
  const lon = ((((ra - gmst * 15) % 360) + 540) % 360) - 180;
  return [lon, dec];
}

// The point opposite the sun: the middle of the night side.
export function antisolarPoint(date = new Date()): [number, number] {
  const [lon, lat] = subsolarPoint(date);
  return [lon > 0 ? lon - 180 : lon + 180, -lat];
}

// Sun's altitude in degrees at a place, right now.
export function solarAltitude(lat: number, lon: number, date = new Date()): number {
  const rad = Math.PI / 180;
  const [sLon, sLat] = subsolarPoint(date);
  const s =
    Math.sin(lat * rad) * Math.sin(sLat * rad) +
    Math.cos(lat * rad) * Math.cos(sLat * rad) * Math.cos((lon - sLon) * rad);
  return Math.asin(s) / rad;
}

// Day = the sun is above the horizon in Brooklyn (allowing for refraction).
export const isBrooklynDay = (date = new Date()) => solarAltitude(40.68, -73.94, date) > -0.833;
