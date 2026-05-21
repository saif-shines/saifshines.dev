import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { heyWorldLoader } from "./lib/hey-world-loader";


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
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    url: z.string(),
    language: z.string().optional(),
    order: z.number().default(99),
  }),
});

const contributions = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/contributions" }),
  schema: z.object({
    repo: z.string(),
    description: z.string(),
    url: z.string(),
    prs: z.number().optional(),
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

export const collections = { thoughts, projects, contributions, work };
