# AgentKit V2 live deck — message and tone

Primary source: `Copy of AgentKit V2 [Live Deck].zip` → `AgentKit Walkthrough.dc.html` (extracted 2026-08-22).

Our talk stays at `public/talks/agentkit/index.html`. This note says what to adopt, not what to paste wholesale.

## 1. Their spine

| # | Label | Headline (their words) |
| --- | --- | --- |
| — | Frame | Auth platform for Apps and Agents. Incoming vs outgoing. |
| 01 | WHAT IT DOES | Delegated OAuth. Per-user actions. |
| 02 | THE PROBLEM | More than an API call. Every tool call carries two questions. |
| 03 | THE COST | The m × n problem. |
| 04 | THE SOLUTION | One layer for all of it. You build the agent. |
| 05 | RUNTIME | One connector, many connections, many accounts. |
| 06 | YOUR STACK | Bring your own connectors & tools. |
| 07 | SCOPING | Scope tools that the agent can reach. Virtual MCP. |
| 08 | TRIGGERS | Coming soon. |
| 09 | DEPLOYMENT | Deploy auth and tool-calling in your infrastructure. |
| 10 | SECURITY | Built for the security review, not just the demo. |
| — | STORY | Z47 (WhatsApp + OpenClaw + Scalekit). Von in production. |
| — | CLOSE | Add AgentKit to your agents. Go-live in <3 days. Luma community. |

## 2. Thesis

Agents must act **as real users, not shared service accounts**.

Every tool call answers two questions:

1. **Who is calling** (authentication)
2. **What can they do** (authorization)

A shared service account answers who and never what. Doing it per user, per tool explodes credentials. Scalekit is **one layer** for delegated auth and tool-calling. **You build the agent.**

## 3. Tone

Numbered section labels. Short sentences. Contrast pairs. One punch line after the proof.

Quoted phrases:

- “What can the agent do, on whose behalf?”
- “Agents that take actions as real users”
- “on behalf of real users, not shared service accounts”
- “Every tool call carries two questions.”
- “Most setups answer *who*. Few enforce *what*.”
- “An open door or a full-time credential job.”
- “Neither ships an agent.”
- “You build the agent.”
- “Configure a connection once. Every user who authorizes gets their own connected account.”
- “Scalekit injects the user's credentials at runtime.”
- “Not just what it's allowed to do.”
- “Built for the security review, not just the demo.”
- “A live agent acting as a real user — not a service account”

## 4. Adjacent context we were missing

- Incoming (login, SSO, RBAC) vs outgoing (AgentKit: delegated OAuth, connectors).
- Alice / Bob / Charlie each with a **user token** to Notion, Slack, Salesforce.
- One Slack connection → Alice's Slack + Bob's Slack.
- Zendesk: two connections (API key vs OAuth) under one connector.
- Built-in tools vs custom `create_ticket` vs `register_connector`.
- Virtual MCP: 30 tools → 1 tool; ~97% token cut.
- Triggers (coming soon).
- Deploy: VPC, customer infra, air-gapped.
- Z47 sandbox that never sees a real token.
- Von GTM agent (Salesforce, Gong) — we already name Von.
- CTA: docs quickstart + Luma “Agents in Production”.

## 5. Adopt vs do not copy

**Adopt:** two questions; m×n cost; “neither ships an agent”; 1→many Alice/Bob; “you build the agent”; numbered kickers; Von as themselves.

**Keep ours:** GitHub PR demo, official `executeTool` names, Next-builds-the-diagram, speaker-led density, no full product tour.

**Do not copy:** Triggers, three deploy modes, full security grid, QR/Luma, “go-live in <3 days” unless Saif wants a sales close.

## 6. Changes to our deck

1. Title kicker → “Agents that take actions as real users”.
2. Add incoming vs outgoing (one slide).
3. Problem slide → two questions (who / what).
4. Cost slide → shared account vs m×n. “Neither ships an agent.”
5. Solution slide → one layer. You build the agent.
6. Architecture headline → “One connector. Many connections. Many accounts.”
7. Add Alice / Bob under one connection.
8. One adjacent scoping line (Virtual MCP), not a tour.
9. Close stays “You can ship this today” + “You build the agent.”

## 7. Extra from speaker notes

Live HTML skips three slides in the live path (`data-deck-skip`): Triggers, Deployment, Security.

Speaker-only lines worth knowing:

- Alice’s agent can read Bob’s Salesforce if you share one account.
- Connection is org-level config. Connected account is per user, tied to real identity, not just an OAuth grant.
- Virtual MCP is two objects: a **Config** (once per agent role, static URL) and a **session token** (per session, who it acts as).
- Von: Salesforce, Gong, Snowflake. Each rep as themselves. “Let’s look at the product.”
- Close they use for sales rooms: docs QR, `<3 days`, Luma bagels. We did not take that close.
