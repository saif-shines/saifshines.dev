# Design , saifshines.dev

A locked design system for this personal site. Every page redesign reads this
file before emitting code. Do not regenerate per page , extend or amend this
file when the system needs to grow.

## Genre

editorial

## Macrostructure family

- **Home (marketing/personal):** Letter opening on a 52ch measure; claims sit beside it from `lg`. Page shell is 64rem so lists use the width.
- **List / index pages** (thoughts, projects, work): Index-first within the same type/colour system
- **Long-form** (thought detail, resume): Long Document , prose measure, hairline rules

## Theme

Newsprint-adjacent custom (warm paper · roman serif display · single rust accent).

- `--color-paper`   oklch(97.5% 0.008 85)
- `--color-paper-2` oklch(94.5% 0.01 85)
- `--color-ink`     oklch(22% 0.018 50)
- `--color-ink-2`   oklch(42% 0.015 50)
- `--color-rule`    oklch(88% 0.01 85)
- `--color-accent`  oklch(48% 0.12 35)
- `--color-focus`   oklch(48% 0.12 35)

Dark mode retints paper/ink; accent stays warm.

## Typography

- **Display:** Lora, weight 600, style normal (roman , never italic headers)
- **Body:** Inter, weight 400
- **UI / labels:** Inter, weight 500-600, small size
- Display tracking: -0.02em on large titles
- Type scale: display name ~clamp(1.75rem, 4vw, 2.5rem); body 1rem / 1.65; measure ~52ch
- Page shell: `--page-max: 64rem`. Prose stays on `--measure`. Do not stretch article lines to the shell.

## Spacing

4-point named scale in `tokens.css` / `:root`. Prefer `var(--space-*)` or Tailwind theme aliases.

## Motion

- Easings: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`
- Reveal: **none by default** (Letter). Optional single first-paint fade on home only.
- Reduced-motion: opacity-only ≤ 150ms, or none.

## Microinteractions stance

- Silent success (no celebratory toasts)
- Hover: colour shift or underline thicken , one signal per control
- Focus: instant `:focus-visible` ring, never animated
- No stagger-on-every-section

## CTA voice

- Primary: typographic link with accent underline (`C3`), not filled pill buttons
- Secondary: muted ink link

## Nav / footer

- Nav: **N9** edge-aligned minimal (letter-shaped personal site)
- Footer: **Ft6** letter close

## What pages MUST share

- Wordmark “Saif Shines”
- Accent colour ≤ ~5% of viewport
- Lora display + Inter body
- Hairline rules (not heavy card grids)
- Token-based paper/ink (no pure #fff / #000)

## What pages MAY differ on

- Section density (home denser work list vs looser thoughts)
- Whether projects render as a compact list vs a single featured item
- Enrichment: none (typography only)

## Exports

Canonical tokens live in `src/styles/global.css` (`:root` / `html.dark`) and are
mirrored for Tailwind in `tailwind.config.mjs`.
