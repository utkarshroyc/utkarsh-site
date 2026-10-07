"use client";

import { useEffect } from "react";
import { isBrooklynDay } from "@/lib/sun";

// Paper "day map" while the sun is up in Brooklyn, green "night map" after sunset.
// The inline script in the layout sets the first theme before paint; this keeps it
// current while the page stays open. ?theme=day|night pins one for previewing.

export const THEME_SCRIPT = `(function(){try{var q=new URLSearchParams(location.search).get('theme');var day;if(q==='day'||q==='night'){day=q==='day'}else{var r=Math.PI/180,d=Date.now()/864e5-10957.5,g=(357.529+.98560028*d)*r,L=(280.459+.98564736*d+1.915*Math.sin(g)+.02*Math.sin(2*g))*r,e=(23.439-3.6e-7*d)*r,ra=Math.atan2(Math.cos(e)*Math.sin(L),Math.cos(L))/r,dec=Math.asin(Math.sin(e)*Math.sin(L)),gm=(18.697374558+24.06570982441908*d)%24,H=(-73.94-(ra-gm*15))*r,p=40.68*r;day=Math.asin(Math.sin(p)*Math.sin(dec)+Math.cos(p)*Math.cos(dec)*Math.cos(H))/r>-0.833}document.documentElement.dataset.theme=day?'day':'night'}catch(_){}})()`;

export default function ThemeClock() {
  useEffect(() => {
    const pinned = new URLSearchParams(location.search).get("theme");
    if (pinned === "day" || pinned === "night") return;
    const tick = () => {
      document.documentElement.dataset.theme = isBrooklynDay() ? "day" : "night";
    };
    const id = setInterval(tick, 5 * 60_000);
    return () => clearInterval(id);
  }, []);
  return null;
}
