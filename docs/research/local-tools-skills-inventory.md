# Local tools & skills inventory — primary sources

Read 2026-09-22 from the machine, not from memory. Every row cites the exact path or command checked.

## Shared skill pool: `~/.agents/skills/`

74 dirs. `~/.claude/skills/*` and `~/.grok/skills/*` are symlinks into this pool (confirmed: `readlink ~/.grok/skills/hey` → `/Users/saif/.agents/skills/hey`). So this is the one skill library, surfaced to both agents. Names (from `ls ~/.agents/skills`): add-api-auth, add-mcp-oauth, address-findings, animation-vocabulary, ask-devex, ask-saif, authoring-cookbooks, check-agentkit-prod, check-saaskit-prod, cli-developer, code-style-patterns, deploy-self-hosted, devrel-dx-craft, devrel-story-craft, devrel-tooling, discover-connectors, docs-contribution-router, docs-writing-style, doraval, eli5, emil-design-eng, explain, expose-agentkit-mcp, find-animation-opportunities, freecodecamp-style, hallmark, handoff, herdr, hey, humanizer, implement-access-control, implement-saaskit(+nextjs/python), implement-scim, implement-sso, improve, improve-animations, integrate-agentkit, journey-sidebar-labels, manage-saaskit-sessions, mcp-server-craft, mcp-server-patterns, migrate-to-saaskit, opentui, pick-ui-library, plugin-craft, pragmatic-fp, pre-upload-check, product-grill-me, prototype, recall, replay, review, review-animations, review-scalekit-code, run-dryrun, sdk-craft, sdk-development, search, session-crosslink, session-handoff, session-to-skill, setup-agentkit, setup-saaskit, setup-scalekit, skill-craft, teach, userinterface-wiki, using-entire, ux-copy, web-design-guidelines, what-happened, writing-guidelines.

## Claude Code skills — global (`~/.claude/skills/*/SKILL.md`)

Dirs that are NOT symlinks (own content, claude-code only):

| Skill | Path | Description (frontmatter) |
| --- | --- | --- |
| pick-ui-library | `~/.claude/skills/pick-ui-library/SKILL.md` | Pick the right library for a frontend task from a curated list. Explicit-invoke only. |
| find-animation-opportunities | `~/.claude/skills/find-animation-opportunities/SKILL.md` | Search a codebase/UI for places that don't animate but should; read-only, proposes motion values. |
| improve-animations | `~/.claude/skills/improve-animations/SKILL.md` | Survey a codebase's motion code as a senior advisor, produce prioritized audit + plans for other agents. |
| prototype | `~/.claude/skills/prototype/SKILL.md` | Build multiple UI variants behind a visual picker. Explicit-invoke only. |
| review-animations | `~/.claude/skills/review-animations/SKILL.md` | Reviews motion code against Emil Kowalski craft bar. Explicit-invoke only. |
| animation-vocabulary | `~/.claude/skills/animation-vocabulary/SKILL.md` | Reverse-lookup glossary for naming a motion effect. |
| emil-design-eng | `~/.claude/skills/emil-design-eng/SKILL.md` | Emil Kowalski's philosophy on UI polish/animation decisions. |
| humanizer (v2.7.0) | `~/.claude/skills/humanizer/SKILL.md` | Removes signs of AI-generated writing; `compatibility: claude-code opencode`. |
| human-review | `~/.claude/skills/human-review/SKILL.md` | Opens HTML/MD in browser for the user to edit/comment, then relays back. |

`~/.claude/skills/synced/` holds two UUID-keyed bundles (not user-authored) with identical contents: `morning`, `xlsx`, `pdf`, `import-memory`, `docs`, `skill-creator`, `pptx`, `scalekit-code-doctor`, `docx` — these mirror the `anthropic-skills:*` plugin skills listed in-session, synced by the client rather than hand-installed.

The rest of `~/.claude/skills/*` (≈65 entries) are symlinks to `~/.agents/skills/*` — same skill, claude-code surface.

## Plugin-installed skills (`~/.claude/plugins/cache/*/*/skills/*/SKILL.md` or plugin-root skill dirs)

Marketplace/plugin dirs present under `~/.claude/plugins/cache/`: skillkit (scalekit, docs-engineering), pm-skills, devex-kit (documentation, tooling, dev-gtm), 37signals (hey), karpathy-skills, claude-code-warp (warp), claude-plugins-official (gopls-lsp, typescript-lsp, pyright-lsp, mattpocock-skills, slack, frontend-design, superpowers), caveman (caveman, caveman-compress), authstack (saaskit, agentkit).

SKILL.md files actually found on disk under plugin cache (the rest are referenced via marketplace manifests, not loose SKILL.md files at this depth):

| Skill | Path | Marketplace/plugin | Description |
| --- | --- | --- | --- |
| skill-authoring-workflow | `~/.claude/plugins/cache/pm-skills/skill-authoring-workflow/a03af68414bb/SKILL.md` | pm-skills | Turn raw PM content into a compliant, publish-ready skill. |
| product-sense-interview-answer | `~/.claude/plugins/cache/pm-skills/product-sense-interview-answer/a03af68414bb/SKILL.md` | pm-skills | Structure a spoken PM product-sense interview answer. |
| caveman-compress | `~/.claude/plugins/cache/caveman/caveman/ef6050c5e184/caveman-compress/SKILL.md` | caveman | Compress memory files (CLAUDE.md, todos) into caveman format. |
| caveman | `~/.claude/plugins/cache/caveman/caveman/ef6050c5e184/caveman/SKILL.md` | caveman | Ultra-compressed communication mode, ~75% token cut. |

## Other repos with local skill dirs (one level under `~/Experiments/*`, `~/Projects/*`)

| Repo | Skill dir(s) found | Notes |
| --- | --- | --- |
| `~/Experiments/doraval` | `.claude/skills`, `.agents/skills` | address-findings, explain, hallmark, nodejs-cli-best-practices, recall, replay, review, search, session-crosslink, session-handoff, session-to-skill, teach, using-entire, what-happened, bun, product-grill-me |
| `~/Experiments/external-agents` | `.claude/skills` | e2e-debug, entire-external-agent |
| `~/Projects/channel-watcher-agent` | `.claude/skills`, `.agents/skills` | ai-sdk, migrate-ai-sdk-v6-to-v7 |
| `~/Projects/cli` | `.agents/skills` | 19 skills, all Scalekit auth-kit flavored (adding-api-auth, implementing-saaskit*, setup-scalekit, scalekit-code-doctor, etc.) |
| `~/Projects/developer-docs` | `.claude/skills`, `.agents/skills` | 37 skills, docs/devrel-flavored (authoring-cookbooks, docs-writing-style, landing-copy, product-spec, remove-ai-slop, skill-creator, etc.) |
| `~/Projects/feedback-syndicate` | `.claude/skills`, `.agents/skills` | 60 skills, devrel/growth-flavored (developer-onboarding, hacker-news-strategy, spec-driven-development, x-devs, youtube-devrel, etc.) |

`~/Experiments/skills` (saif-shines/devex-kit source) and `~/Projects/skillkit` exist on disk — noted, not enumerated per instructions (already-known source).

## Grok (`~/.grok/`)

Top-level entries of note: `skills/` (48 symlinks into `~/.agents/skills/` + 3 real dirs, see below), `hooks/` (`turn-index.json`, `herdr.json`, `herdr-agent-state.sh`), `rules/` (`zsimple.md`, `hey-planning.md`, `prefer-exa.md` — same rule files as `~/.agents/rules`, mirrored), `plugins/turn-index/` (a Grok plugin with its own hooks/commands/skills for turn indexing), `installed-plugins` (empty file), `config.toml`, `AGENTS.md`.

Real (non-symlink) skills unique to Grok:

| Skill | Path | Description |
| --- | --- | --- |
| typesafe-ai | `~/.grok/skills/typesafe-ai/SKILL.md` | Build AI-powered software with TypeSafe (System One models / Jev) — typed judgments from NL + app state. |
| sublime-api | `~/.grok/skills/sublime-api/SKILL.md` | Call the Sublime.app library REST API (save URL/note, search, collections). `compatibility: claude-code, cursor, grok, copilot, codex`. |
| show-me | `~/.grok/skills/show-me/SKILL.md` | Visualize current topic via diagrams/code-shape sketches/HTML artifacts. |

`grok --version`: `grok 1.0.40 (eb1a2256660d) [stable]` (checked via `grok --version`).

### saifshines.dev repo — Grok + Entire hooks

- `saifshines.dev/.grok/hooks/entire.json` — full Entire lifecycle hook set for Grok (Notification, PermissionDenied/Request, PostCompact, PostToolUse(+Failure), PreCompact, PreToolUse, SessionEnd/Start, Stop(+Cancelled/Failure), SubagentStart/Stop, UserPromptSubmit), each shelling out to `/Users/saif/.local/bin/entire hooks grok <event>` when `entire` is on PATH.
- `saifshines.dev/.claude/settings.json` — matching Entire hooks for claude-code (`entire hooks claude-code post-task|post-todo|pre-task|session-end|session-start|stop|subagent-stop|user-prompt-submit`).
- `saifshines.dev/.claude/settings.local.json` — allowlists `entire session *`, `entire --help`, `entire enable *`, `entire status *`, `entire checkpoint *`, `entire agent-help *`, `entire review *`, `entire investigate *`, `entire version *`, `entire trail *`, `entire auth *`.
- `saifshines.dev/.entire/settings.json` — `{"enabled": true, "checkpoints": {"primary": {"type": "git-refs"}}}`.
- No `.claude/skills` or `.agents/skills` dir inside the saifshines.dev repo itself.

## CLIs installed (verified with `command -v`)

| CLI | Found | Path / alias | Version |
| --- | --- | --- | --- |
| entire | yes | `/Users/saif/.local/bin/entire` | `Entire CLI 0.10.6` |
| gh | yes | `/opt/homebrew/bin/gh` | — |
| pnpm | yes | `/opt/homebrew/bin/pnpm` | — |
| npm | yes | `/Users/saif/.local/bin/npm` | — |
| herdr | yes | `/Users/saif/.local/bin/herdr` | `herdr 0.8.2` |
| dora | yes | alias `dora='bun run /Users/saif/Experiments/doraval/src/cli/index.ts'` | help banner: "Reads your repo and tells you what's broken in agent context" |
| hey | yes | `/Users/saif/.local/bin/hey` | `hey version 1.4.0` |
| grok | yes | `/Users/saif/.grok/bin/grok` | `grok 1.0.40 (eb1a2256660d) [stable]` |
| claude | yes | `/Users/saif/.local/bin/claude` | `2.1.278 (Claude Code)` |

### `~/.zshrc` / `~/.zshenv` dev-tool lines (exact matches)

```
.zshrc:2:export PATH="/opt/homebrew/bin:$PATH"
.zshrc:3:export PATH="$HOME/.local/bin:$PATH"
.zshrc:117:export PATH="$HOME/.grok/bin:$PATH"
.zshrc:124:  *) export PATH="$PNPM_HOME:$PATH" ;;
.zshrc:133:export PATH="$BUN_INSTALL/bin:$PATH"
.zshrc:136:alias dora='bun run /Users/saif/Experiments/doraval/src/cli/index.ts'
.zshrc:137:alias doraval='bun run /Users/saif/Experiments/doraval/src/cli/index.ts'
.zshrc:146:alias yolo-claude='claude --dangerously-skip-permissions'
.zshrc:147:alias yolo-grok='grok --dangerously-skip-permissions'
.zshrc:149:alias yolo-opencode='opencode --auto'
.zshenv:2:export PATH="$VOLTA_HOME/bin:$PATH"
.zshenv:5:export PATH="$HOME/.local/bin:$PATH"
```

## Global agent rules (`~/.agents/rules/*.md`)

Only 2 files exist (not just the 2 already known to the caller — this *is* the complete set):

| File | Purpose (frontmatter `description`) |
| --- | --- |
| `~/.agents/rules/hey-planning.md` | Use HEY for personal todos, calendar, email, life admin; ask before adding a HEY todo; don't use in software sessions unless asked. |
| `~/.agents/rules/prefer-exa.md` | Prefer Exa for public web search; don't start with built-in web search. |

`~/.agents/skills/` — see "Shared skill pool" above; it is the real store that both `~/.claude/skills` and `~/.grok/skills` symlink into (74 entries).
