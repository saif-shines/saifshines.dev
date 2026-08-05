import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Saif Ali Shaik",
  EMAIL: "saif.shines@hey.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
};

/** Recognizable seat — use as the title everywhere. */
export const ROLE = "Founding Developer Advocate";

/** DX mandate under the title — outcome language, not a second job title. */
export const ROLE_FOCUS =
  "API design · SDK ergonomics · docs · CLIs · onboarding · context engineering";

/** Free-time writing role (current). */
export const ROLE_WRITING = "Author";
export const ROLE_WRITING_ORG = "freeCodeCamp";
export const ROLE_WRITING_URL = "https://www.freecodecamp.org/news";
export const ROLE_WRITING_NOTE = "free-time · current";
export const ROLE_WRITING_LOGO = "/assets/logos/freecodecamp-icon.svg";

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: `${ROLE}. ${ROLE_FOCUS.replace(/ · /g, ", ")}.`,
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
// Seeded from Scalekit DX distribution work (Linear SK-1380).
// Titles use portfolio-oriented achievement phrasing.
export interface EcosystemListing {
  host: string;
  title: string;
  url: string;
}

export const ECOSYSTEM_LISTINGS: EcosystemListing[] = [
  {
    host: "Astro",
    title:
      "Published official Scalekit authentication integration guide and SSR example for Astro backends",
    url: "https://docs.astro.build/en/guides/backend/scalekit/",
  },
  {
    host: "xmcp",
    title:
      "Shipped Scalekit MCP Auth as a first-class xmcp integration, with docs and a ready-to-use template",
    url: "https://xmcp.dev/docs/integrations/scalekit",
  },
  {
    host: "xmcp template",
    title: "Published the Scalekit auth template for xmcp server builders",
    url: "https://xmcp.dev/templates/scalekit",
  },
  {
    host: "LiteLLM",
    title:
      "Published guide to use LiteLLM for request routing with Scalekit as the tool-calling and auth layer",
    url: "https://docs.litellm.ai/docs/tutorials/scalekit_agentkit",
  },
  {
    host: "FastMCP",
    title:
      "Shipped Scalekit as first-class MCP Auth integration for FastMCP users building production servers",
    url: "https://gofastmcp.com/integrations/scalekit",
  },
  {
    host: "FastRouter",
    title:
      "Listed Scalekit as an official FastRouter app integration for authenticated routing workflows",
    url: "https://docs.fastrouter.ai/integrations/app/scalekit",
  },
  {
    host: "Apify",
    title:
      "Published Scalekit on Apify Integrations so scraper and agent builders can wire auth in-platform",
    url: "https://apify.com/integrations/scalekit",
  },
  {
    host: "Chargebee",
    title:
      "Co-authored Chargebee tutorial on syncing B2B billing with Scalekit identity and entitlements",
    url: "https://www.chargebee.com/tutorials/sync-b2b-billing-with-scalekit-and-chargebee",
  },
  {
    host: "Cursor Directory",
    title:
      "Published the Authstack plugin on Cursor Directory so coding agents can integrate Scalekit auth",
    url: "https://cursor.directory/plugins/authstack",
  },
  {
    host: "scim.cloud",
    title: "Listed Scalekit as a SCIM client in the community SCIM directory",
    url: "https://github.com/aaronpk/scim.cloud",
  },
  // Pending public partner pages from SK-1380 distribution track:
  // LiveKit + Vapi guides live on scalekit.com (see work entries); Rime still in thinking.
];
