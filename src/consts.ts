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

// Ecosystem listings — direct links to production pages where Scalekit
// (or prior work) is featured as an integration, guide, or listing.
// One source of truth. Rendered on /projects and /work.
// Titles use portfolio-oriented achievement phrasing.
export interface EcosystemListing {
  host: string;
  title: string;
  url: string;
}

export const ECOSYSTEM_LISTINGS: EcosystemListing[] = [
  {
    host: "Astro",
    title: "Published official Scalekit authentication integration guide and SSR example for Astro backends",
    url: "https://docs.astro.build/en/guides/backend/scalekit/",
  },
  {
    host: "xmcp",
    title: "Listed and shipped Scalekit's MCP Auth as first-class integration for anyone building MCP servers with xmcp.dev",
    url: "https://xmcp.dev/docs/integrations/scalekit",
  },
  {
    host: "LiteLLM",
    title: "Published guide to use LiteLLM for request routing and Scalekit as tool calling and auth layer",
    url: "https://docs.litellm.ai/docs/tutorials/scalekit_agentkit",
  },
  {
    host: "FastMCP",
    title: "Shipped Scalekit as first-class MCP Auth integration for FastMCP users building production servers",
    url: "https://gofastmcp.com/integrations/scalekit",
  },
  // Add more here as the public production pages go live.
  // Use specific achievement language (what you enabled for their users).
];