"use client";

import { useEffect, useRef, useState } from "react";
import type { ShelfBook } from "@/lib/fable";

// Books I've finished on Fable, as spines on a shelf. Thicker books get wider spines;
// heights vary a little so it looks like a real shelf.

const width = (pages: number) => Math.round(Math.min(46, Math.max(22, pages / 11)));
const height = (title: string) => 150 + ([...title].reduce((a, c) => a + c.charCodeAt(0), 0) % 5) * 7;

export default function Bookshelf({ books }: { books: ShelfBook[] }) {
  // Spines rise into place, staggered, the first time the shelf scrolls into view.
  // "armed" is only set by JS, so without JS (or before hydration) the shelf just shows.
  const ref = useRef<HTMLUListElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    // Only hide-then-rise if the shelf starts below the fold.
    if (el.getBoundingClientRect().top > innerHeight) {
      requestAnimationFrame(() => setArmed(true));
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  if (!books.length) return null;
  return (
    <>
      <h3 className="label sub shelf">Bookshelf</h3>
      <p className="intro">Finished lately, straight from my Fable shelf.</p>
      <ul ref={ref} className={`bookshelf${armed ? " is-armed" : ""}${shown ? " is-shown" : ""}`}>
        {books.map((b, i) => (
          <li key={b.href} style={{ "--i": i } as React.CSSProperties} data-tip={`${b.title}${b.author ? ` · ${b.author}` : ""}`}>
            <a
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              className="spine"
              style={{ width: width(b.pages), height: height(b.title), background: b.color }}
              aria-label={`${b.title}${b.author ? ` by ${b.author}` : ""}`}
            >
              <span>{b.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
