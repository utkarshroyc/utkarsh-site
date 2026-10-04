export const SUBSTACK_URL = "https://slightlyunfinished.substack.com";

export type Post = { title: string; blurb: string; href: string; date: Date };

const field = (item: string, tag: string) =>
  item
    .match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`))?.[1]
    ?.trim() ?? "";

// Latest posts from the newsletter feed, refreshed hourly. Empty on failure.
export async function getPosts(limit = 5): Promise<Post[]> {
  try {
    const res = await fetch(`${SUBSTACK_URL}/feed`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, limit).map(([, item]) => ({
      title: field(item, "title"),
      blurb: field(item, "description"),
      href: field(item, "link"),
      date: new Date(field(item, "pubDate")),
    }));
  } catch {
    return [];
  }
}
