import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { heyWorldLoader } from "./lib/hey-world-loader";
import { githubLoader } from "./lib/github-loader";

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date().optional(),
    draft: z.boolean().optional(),
  }),
});

const thoughts = defineCollection({
  loader: heyWorldLoader({
    feed: "https://world.hey.com/saif.shines/feed.atom",
  }),
  schema: z.object({
    title: z.string(),
    content: z.string(),
    date: z.coerce.date(),
    url: z.string(),
  }),
});

const projects = defineCollection({
  loader: githubLoader({ username: "Saif-Shines" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    url: z.string(),
    stars: z.number(),
    language: z.string().nullable(),
    updatedAt: z.coerce.date(),
    topics: z.array(z.string()),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    type: z.enum(["talk", "article", "workshop", "community", "video"]),
    event: z.string().optional(),
    date: z.coerce.date(),
    url: z.string().optional(),
    description: z.string(),
  }),
});

export const collections = { notes, thoughts, projects, work };
