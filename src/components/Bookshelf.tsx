import type { ShelfBook } from "@/lib/fable";

// Books I've finished on Fable, as spines on a shelf. Thicker books get wider spines;
// heights vary a little so it looks like a real shelf.

const width = (pages: number) => Math.round(Math.min(46, Math.max(22, pages / 11)));
const height = (title: string) => 150 + ([...title].reduce((a, c) => a + c.charCodeAt(0), 0) % 5) * 7;

export default function Bookshelf({ books }: { books: ShelfBook[] }) {
  if (!books.length) return null;
  return (
    <>
      <h3 className="label sub shelf">Bookshelf</h3>
      <p className="intro">Finished lately, straight from my Fable shelf.</p>
      <ul className="bookshelf">
        {books.map((b) => (
          <li key={b.href} data-tip={`${b.title}${b.author ? ` · ${b.author}` : ""}`}>
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
