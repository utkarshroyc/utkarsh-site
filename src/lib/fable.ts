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
