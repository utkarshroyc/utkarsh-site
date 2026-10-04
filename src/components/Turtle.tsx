"use client";

import { findCritter } from "@/lib/critters";

// A turtle that ambles back and forth along the footer line.
// A nod to "How will the turtles know?". Click it to jump to the research.

export default function Turtle() {
  return (
    <div className="turtle-track">
      <a
        href="#research"
        className="turtle"
        aria-label="A turtle. Jump to research"
        data-tip="how will the turtles know?"
        onClick={() => findCritter("turtle")}
      >
        <svg viewBox="0 0 30 16" width="30" height="16" aria-hidden="true">
          <g className="turtle-legs">
            <ellipse cx="9" cy="13.4" rx="2" ry="1.6" />
            <ellipse cx="20" cy="13.4" rx="2" ry="1.6" />
          </g>
          <path d="M3.2 12.4l-2.4 1.2 2.6.4z" className="turtle-skin" />
          <circle cx="26" cy="10.4" r="2.6" className="turtle-skin" />
          <circle cx="27" cy="9.8" r=".5" fill="#0d1913" />
          <path d="M4 12.6C4.8 5 9 3 14.6 3s9.8 2 10.4 9.6z" className="turtle-shell" />
          <path d="M9 12.4l1.6-4.6h8l1.6 4.6M10.6 7.8l4-4.2 4 4.2" className="turtle-scutes" />
        </svg>
      </a>
    </div>
  );
}
