import { geoDistance, geoGraticule10, geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import land110 from "world-atlas/land-110m.json";
import { places } from "@/lib/content";
import MapView from "./MapView";

// Geometry is computed on the server; MapView adds the interactions.
const W = 640;
const H = 300;

const topo = land110 as unknown as Topology<{ land: GeometryCollection }>;
const land = feature(topo, topo.objects.land);

// Frame the band from the Rockies to the Ganga.
const projection = geoNaturalEarth1().fitExtent(
  [[16, 16], [W - 16, H - 16]],
  {
    type: "MultiPoint",
    coordinates: [[-110, 12], [92, 12], [-110, 56], [92, 56], ...places.map((p) => p.at)],
  }
);
const path = geoPath(projection);

// Each marker appears when the drawn route reaches it, so time it by distance travelled.
const legs = places.map((p, i) => (i ? geoDistance(places[i - 1].at, p.at) : 0));
const total = legs.reduce((a, b) => a + b, 0);
let travelled = 0;
const markers = places.map((p, i) => {
  travelled += legs[i];
  const [x, y] = projection(p.at)!;
  return { ...p, x: +x.toFixed(1), y: +y.toFixed(1), at: travelled / total };
});

// The Ganga, roughly, from Gangotri to the Bay of Bengal. Hidden until summoned.
const GANGA: [number, number][] = [
  [78.94, 30.99], [78.27, 30.09], [78.16, 29.95], [79.4, 28.4], [80.33, 26.45],
  [81.88, 25.43], [83.0, 25.32], [85.14, 25.6], [86.98, 25.25], [87.92, 24.81],
  [88.36, 22.57], [88.1, 21.6],
];
const [gx, gy] = projection([83.0, 25.32])!;

// Readers can be anywhere, so their view shows the whole globe.
const globe = geoNaturalEarth1().fitExtent([[8, 8], [W - 8, H - 8]], { type: "Sphere" });
const globePath = geoPath(globe);

export default function WorldMap() {
  return (
    <MapView
      w={W}
      h={H}
      scale={projection.scale()}
      translate={projection.translate()}
      graticule={path(geoGraticule10()) ?? ""}
      land={path(land) ?? ""}
      route={path({ type: "LineString", coordinates: places.map((p) => p.at) }) ?? ""}
      ganga={path({ type: "LineString", coordinates: GANGA }) ?? ""}
      gangaLabel={[+gx.toFixed(1), +gy.toFixed(1)]}
      markers={markers}
      world={{
        scale: globe.scale(),
        translate: globe.translate(),
        land: globePath(land) ?? "",
        graticule: globePath(geoGraticule10()) ?? "",
        sphere: globePath({ type: "Sphere" }) ?? "",
        route: globePath({ type: "LineString", coordinates: places.map((p) => p.at) }) ?? "",
        marks: places.map((p) => globe(p.at)!.map((v) => +v.toFixed(1)) as [number, number]),
      }}
    />
  );
}
