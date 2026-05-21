import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Saif Shines",
  EMAIL: "saif@saifshines.dev",
  NUM_POSTS_ON_HOMEPAGE: 5,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION:
    "Developer Advocate, Technical Evangelist & Platform Experience Specialist.",
};

export const NOTES: Metadata = {
  TITLE: "Notes",
  DESCRIPTION: "A collection of notes on topics I care about.",
};

export const NAV_ITEMS = [
  { text: "notes", href: "/notes" },
  { text: "thoughts", href: "/thoughts" },
  { text: "projects", href: "/projects" },
  { text: "work", href: "/work" },
  { text: "resume", href: "/resume" },
];

export const SOCIALS: Socials = [
  { NAME: "github", HREF: "https://github.com/Saif-Shines" },
];