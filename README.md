# saifshines.dev

Personal site for [Saif Ali Shaik](https://saifshines.dev) , notes, thoughts, projects, and developer relations work. Built with [Astro](https://astro.build) and styled after [Astro Nano](https://github.com/markhorn-dev/astro-nano).

## Overview

A statically generated site that pulls content from multiple sources at build time:

| Section | Source | Sync |
|---------|--------|------|
| **Notes** | Local Markdown (`src/content/notes/`) | On commit |
| **Thoughts** | [HEY World](https://world.hey.com/saif.shines) Atom feed | Every 6 hours |
| **Projects** | [GitHub API](https://github.com/Saif-Shines) | Every 6 hours |
| **Work** | Local Markdown (`src/content/work/`) | On commit |

Thoughts and Projects use **custom Astro content loaders** that fetch remote data during the build and expose it through the same `getCollection()` API as local content.

## Project Structure

```
src/
├── components/          # Astro components (Header, Footer, ArrowCard, etc.)
├── content/
│   ├── notes/           # Technical notes (Markdown)
│   └── work/            # DevRel portfolio entries (Markdown)
├── layouts/             # Base and Note layouts
├── lib/
│   ├── hey-world-loader.ts   # Custom loader: HEY World Atom feed
│   ├── github-loader.ts      # Custom loader: GitHub REST API
│   └── utils.ts               # Date formatting, reading time, cn()
├── pages/               # File-based routing
│   ├── index.astro
│   ├── notes/
│   ├── thoughts/
│   ├── projects.astro
│   ├── work.astro
│   └── rss.xml.ts
├── styles/global.css
├── consts.ts
└── content.config.ts    # All four collection definitions
```

## Getting Started

```bash
pnpm install
pnpm dev
```

The dev server starts at `http://localhost:4321`. On first run, content loaders fetch live data from HEY World and GitHub.

### Commands

| Command | Action |
|---------|--------|
| `pnpm dev` | Start dev server with hot reload |
| `pnpm build` | Build static site to `dist/` |
| `pnpm preview` | Preview the production build locally |

## Content Loaders

### HEY World (`hey-world-loader.ts`)

Fetches the full Atom feed from `world.hey.com/saif.shines/feed.atom`, follows pagination, parses entries with `fast-xml-parser`, and stores each post with its title, HTML content, date, and canonical URL.

### GitHub (`github-loader.ts`)

Fetches public repos from the GitHub REST API, filters out forks and repos without descriptions, and stores each with name, description, stars, language, and topics.

> [!TIP]
> Set a `GITHUB_TOKEN` environment variable for higher API rate limits during local development. The unauthenticated limit (60 req/hr) is fine for production builds.

## Auto-Rebuild

A GitHub Actions workflow (`.github/workflows/rebuild.yml`) triggers a Netlify build every 6 hours, keeping HEY World posts and GitHub activity fresh.

To activate:

1. In Netlify, go to **Site Settings > Build & Deploy > Build Hooks** and create a hook
2. In your GitHub repo, go to **Settings > Secrets** and add `NETLIFY_BUILD_HOOK` with the hook URL

## Stack

- [Astro 5](https://astro.build) , static site generator with content layer API
- [Tailwind CSS 3](https://tailwindcss.com) , utility-first styling with dark mode
- [Inter](https://rsms.me/inter/) + [Lora](https://github.com/cyrealtype/Lora-Cyrillic) , typography via Fontsource
- [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) , Atom feed parsing
- [Netlify](https://netlify.com) , hosting and deploys
