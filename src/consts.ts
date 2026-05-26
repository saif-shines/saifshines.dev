import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Saif Shines",
  EMAIL: "saif@saifshines.dev",
  NUM_POSTS_ON_HOMEPAGE: 5,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION:
    "Founding Developer Advocate. API design, SDK ergonomics, docs, CLIs, and developer tooling.",
};

export const NAV_ITEMS = [
  { text: "thoughts", href: "/thoughts" },
  { text: "projects", href: "/projects" },
  { text: "work", href: "/work" },
  { text: "resume", href: "/resume" },
];

export const SOCIALS: Socials = [
  { NAME: "github", HREF: "https://github.com/Saif-Shines" },
];