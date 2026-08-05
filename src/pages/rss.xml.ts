import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@consts";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const thoughts = (await getCollection("thoughts"))
    .sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());

  const work = (await getCollection("work"))
    .sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());

  const items = [
    ...thoughts
      .filter((t) => t.data.title)
      .map((t) => ({
        title: String(t.data.title),
        description: String(t.data.title),
        pubDate: new Date(t.data.date),
        link: `/thoughts/${t.id}/`,
      })),
    ...work
      .filter((w) => w.data.title)
      .map((w) => ({
        title: String(w.data.title),
        description: String(w.data.description),
        pubDate: new Date(w.data.date),
        link: String(w.data.url ?? `/work/`),
      })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: SITE.NAME,
    description: "Founding Developer Advocate. API design, SDK ergonomics, docs, CLIs, and onboarding.",
    site: context.site!,
    items,
  });
}