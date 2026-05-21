import type { Loader } from "astro/loaders";
import { XMLParser } from "fast-xml-parser";

interface HeyWorldOptions {
  feed: string;
}

export function heyWorldLoader(opts: HeyWorldOptions): Loader {
  return {
    name: "hey-world-loader",
    async load({ store, logger }) {
      logger.info("Fetching HEY World feed...");
      const entries: AtomEntry[] = [];
      let url: string | null = opts.feed;

      // Follow pagination
      while (url) {
        const res = await fetch(url);
        if (!res.ok) {
          logger.error(`Failed to fetch ${url}: ${res.status}`);
          break;
        }

        const xml = await res.text();
        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: "@_",
        });
        const parsed = parser.parse(xml);
        const feed = parsed.feed;

        const rawEntries = Array.isArray(feed.entry)
          ? feed.entry
          : feed.entry
            ? [feed.entry]
            : [];

        for (const entry of rawEntries) {
          entries.push({
            id: entry.id,
            title: entry.title,
            content: entry.content?.["#text"] ?? entry.content ?? "",
            published: entry.published,
            updated: entry.updated,
            url: extractLink(entry.link),
          });
        }

        // Check for next page
        url = extractNextLink(feed.link);
      }

      logger.info(`Loaded ${entries.length} HEY World posts`);

      store.clear();
      for (const entry of entries) {
        const slug = slugify(entry.url || entry.title);
        store.set({
          id: slug,
          data: {
            title: entry.title,
            content: entry.content,
            date: new Date(entry.published),
            url: entry.url,
          },
        });
      }
    },
  };
}

interface AtomEntry {
  id: string;
  title: string;
  content: string;
  published: string;
  updated: string;
  url: string;
}

function extractLink(link: unknown): string {
  if (Array.isArray(link)) {
    const alt = link.find(
      (l: Record<string, string>) => l["@_rel"] === "alternate"
    );
    return alt?.["@_href"] ?? link[0]?.["@_href"] ?? "";
  }
  if (typeof link === "object" && link !== null) {
    return (link as Record<string, string>)["@_href"] ?? "";
  }
  return String(link ?? "");
}

function extractNextLink(link: unknown): string | null {
  if (!Array.isArray(link)) return null;
  const next = link.find(
    (l: Record<string, string>) => l["@_rel"] === "next"
  );
  return next?.["@_href"] ?? null;
}

function slugify(input: string): string {
  // Extract slug from HEY World URL like https://world.hey.com/saif.shines/some-post-title-abc123
  const urlMatch = input.match(/\/([^/]+)$/);
  if (urlMatch) return urlMatch[1];
  // Fallback: slugify the title
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}