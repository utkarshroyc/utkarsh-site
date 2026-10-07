import Link from "next/link";

// "Off the map": the 404 page is an uncharted sheet with a sea serpent and a lost turtle.

export const metadata = { title: "Off the map · Utkarsh Roy Choudhury" };

// The turtle wanders a loose loop across the blank sheet.
const WANDER = "M80 250 C160 200 260 290 360 240 S520 170 600 230 S520 330 400 300 S180 330 80 250Z";

export default function NotFound() {
  return (
    <main className="page offmap">
      <p className="meta offmap-coords">??° N, ??° W · Uncharted</p>

      <svg viewBox="0 0 680 380" className="offmap-sheet" role="img" aria-label="An uncharted map with a sea serpent and a lost turtle">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" className="offmap-grid" />
          </pattern>
        </defs>
        <rect width="680" height="380" fill="url(#grid)" />

        {/* The last surveyed coastline, trailing off into guesswork. */}
        <path d="M0 70 C40 60 70 90 110 80 S170 40 210 60 S260 110 300 95" className="offmap-coast" />
        <path d="M300 95 C340 80 370 120 420 105 S500 60 540 90" className="offmap-coast unsurveyed" />

        {/* Here be dragons. */}
        <g transform="translate(470 300)">
          <g className="serpent">
          <path d="M0 0c12-26 30-26 40 0M48 0c12-26 30-26 40 0M96 0c10-20 24-22 32-6" />
          <circle cx="128" cy="-6" r="7" />
          <circle cx="131" cy="-8" r="1.6" className="eye" />
          <path d="M-14 4c6-10 12-8 14-4" />
          </g>
          <path d="M-20 6h140" className="waterline serpent-water" />
        </g>

        {/* A compass that has given up. */}
        <g className="compass" transform="translate(90 300)">
          <circle r="26" />
          <path d="M0 -20L5 0 0 20 -5 0Z" className="needle" />
          <text y="-32" textAnchor="middle">N?</text>
        </g>

        <g className="lost-turtle">
          <animateMotion dur="38s" repeatCount="indefinite" rotate="auto" path={WANDER} />
          <g transform="scale(1.8) translate(-15 -10)">
            <ellipse cx="9" cy="13.4" rx="2" ry="1.6" className="skin" />
            <ellipse cx="20" cy="13.4" rx="2" ry="1.6" className="skin" />
            <circle cx="26" cy="10.4" r="2.6" className="skin" />
            <path d="M4 12.6C4.8 5 9 3 14.6 3s9.8 2 10.4 9.6z" className="shell" />
          </g>
        </g>
      </svg>

      <h1 className="offmap-title">Here be dragons</h1>
      <p className="lede">
        You&apos;ve wandered off the map. This page was never surveyed, and the only one here is a
        turtle who also seems lost.
      </p>
      <p className="offmap-back">
        <Link href="/">← Back to known territory</Link>
      </p>
    </main>
  );
}
