# Skills & tools knowledge graph

## Purpose

A page on saifshines.dev that shows the skills and tools the site owner uses
across work and personal projects, as an interactive graph, with some
entries kept private.

## Constraints

- Skills come from many places: devex-kit, skillkit, mattpocock-skills,
  local-only skills, various coding agents (Claude Code, Grok, Herdr, ...).
  Auto-aggregating all of these is a separate, later problem. **v1 uses a
  hand-curated data file.**
- Some entries must never reach the browser. Filtering must happen at build
  time, not in client-side JS. A client-side "hide if private" filter still
  ships the private data in the bundle — not acceptable.
- The site is Astro + Tailwind (see `src/components/EcosystemList.astro` for
  existing token usage: `text-ink`, `text-muted`, `accent`, `divide-rule`).
  No React/Vite — stay framework-light.

## Prior art adapted

[LemonAdorable/astro-theme-iris](https://github.com/LemonAdorable/astro-theme-iris)
ships an Astro + D3 knowledge-graph component (`Apache-2.0`):
`src/components/graph/KnowledgeGraph.astro` + `knowledge-graph.ts`.

Its shape, reused here:
- The graph component never reads content directly. It fetches one static
  JSON file, generated at build time from a content source.
- That build step is the privacy boundary: anything not written into the
  JSON is never fetched by the browser.
- Nodes carry a `kind`; edges are computed from shared tags (`co-tag`
  pattern) — no manual edge list to maintain.
- Force-directed layout via `d3-force`, rendered to SVG, with drag/zoom/pan
  and a search box.

Not reused as-is:
- Their node kinds (`blog`/`docs`/`tag`/`category`) — replaced with ours.
- Their UI copy (Chinese) and dialog-overlay chrome — replaced with plain
  English and a normal full page (see Open question below).
- Their `hsl(var(--x))` color tokens — replaced with this site's Tailwind
  tokens.
- Apache-2.0 requires keeping their copyright notice. A short attribution
  comment goes at the top of the adapted `.ts` file.

## Data model

`src/data/skills.yaml`, hand-curated:

```yaml
- name: systematic-debugging
  type: skill              # skill | tool
  domain: work              # work | personal
  agent: claude-code         # claude-code | grok | herdr | matt-pocock-skills | local | ...
  tags: [debugging, process]
  visibility: public         # public | private
  url: https://... # optional, e.g. source repo

- name: some-internal-thing
  type: skill
  domain: work
  agent: claude-code
  tags: [internal]
  visibility: private
```

`agent` is a free-form string, not an enum — new agents get added without a
schema change. `tags` drive edges: two nodes sharing a tag get a line
between them.

## Build-time privacy filter

A small build step (Astro content collection loader, or a Node script run
pre-build) reads `skills.yaml`, drops every entry with `visibility: private`,
and writes the result to `public/graphIndex.json`. The graph page and its
client script only ever fetch `graphIndex.json` — they have no access to
`skills.yaml` or the private entries at all.

## Page

New route: `/graph` (or a name TBD — see open question), rendered as a
normal full page using `Base` layout, not a modal dialog. Renders the graph
component client-side (`client:load` or a plain inline `<script>`, matching
the reference's approach of a vanilla TS module — no React needed).

Node color by `type` (skill vs tool); optional visual grouping by `domain`.
Click a node: side panel shows its tags, agent, and (if present) its `url`.
Search box filters by name, matching the reference component's behavior.

## Testing

- Build the site (`npm run build`) and confirm `graphIndex.json` contains no
  `visibility: private` entries — grep the built output file directly.
- Manual check in the browser: search, click, drag, zoom all work; no
  console errors.

## Open questions

1. ~~Page slug~~ — decided: `/dev-setup`.
2. ~~Full page vs. dialog~~ — decided: full page.
3. ~~Nav placement~~ — decided: linked in the site nav.
