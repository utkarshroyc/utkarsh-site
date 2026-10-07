// "Currently reading", pulled from my public Fable shelf and refreshed hourly.
// This is Fable's undocumented web API, so any failure returns null and the
// site falls back to the "reading" entry in currently.json.

const SHELF = "e92da8fc-ce57-4614-9c13-591f54bbec88";

type FableBook = { title: string; url: string; authors: { name: string }[] };

export async function getReading(): Promise<{ value: string; href: string } | null> {
  try {
    const res = await fetch(`https://api.fable.co/api/book_lists/${SHELF}/books/`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const books: FableBook[] = ((await res.json()).results ?? []).map((r: { book: FableBook }) => r.book);
    if (!books.length) return null;
    const [first, ...rest] = books;
    const author = first.authors?.[0]?.name;
    return {
      value: `${first.title}${author ? `, ${author}` : ""}${rest.length ? ` (+${rest.length} more)` : ""}`,
      href: first.url,
    };
  } catch {
    return null;
  }
}

// My "Finished" shelf, for the bookshelf. Same caveats: hourly, and [] on any failure.
const FINISHED = "7ca775b5-10b8-42d3-a6e3-8482d8126ec5";

export type ShelfBook = { title: string; author: string; href: string; color: string; pages: number };

export async function getFinished(): Promise<ShelfBook[]> {
  try {
    const res = await fetch(`https://api.fable.co/api/book_lists/${FINISHED}/books/?limit=60`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    type Row = { book: FableBook & { background_color?: string; page_count?: number | null } };
    return ((await res.json()).results ?? []).map(({ book }: Row) => ({
      title: book.title,
      author: book.authors?.[0]?.name ?? "",
      href: book.url,
      color: /^#[0-9a-f]{6}$/i.test(book.background_color ?? "") ? book.background_color! : "#2f5a40",
      pages: book.page_count ?? 300,
    }));
  } catch {
    return [];
  }
}
