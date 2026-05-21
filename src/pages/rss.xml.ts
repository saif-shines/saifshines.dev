import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@consts";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const notes = (await getCollection("notes"))
    .filter((n) => !n.data.draft)
    .sort((a, b) => {
      const da = a.data.date ? new Date(a.data.date).valueOf() : 0;
      const db = b.data.date ? new Date(b.data.date).valueOf() : 0;
      return db - da;
    });

  return rss({
    title: SITE.NAME,
    description: HOME_DESC,
    site: context.site!,
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.description,
      pubDate: note.data.date,
      link: `/notes/${note.id}/`,
    })),
  });
}

const HOME_DESC =
  "Developer Advocate, Technical Evangelist & Platform Experience Specialist.";