---
title: Why Locksmith?
description: Why Locksmith?
date: 2024-11-19
---

### Problem statement

Developer tool chain is growing the fastest in last one year alone. Even with the clearest goals, and best AI tools available at disposal, adopting those tools to reach their goals is still filled with lots of friction. A little bit of structure so that developers stay in the "flow" would solve it. Locksmith is the CLI that helps developers implement a new module into their exisiting projects faster without leaving their existing toolchain.

### Users and Context

Developers are the primary users of this product.

Examples:

- If the goal is to store users and organizations data in a database, developers should be focussed on writing code and retrieving it. Yet, lots of time is still spent on signing, doing a poc, understanding docs, probing questions with LLMs, plumbing their account specific identifiers with the providers. There has to be a better way.
- If the goal is to add authentication to their application -- there scalekit, betterauth, fusionauth, auth0, workos and 10 other tools. Their own SDKs, own docs, own UI where configurations need to be done. There has to be better way.

Many hours are being wasted — for developers, hence the teams, hence velocity, hence the business.

A little bit of structure so that developers stay in the "flow" would solve. Locksmith is the CLI that helps developers implement a new module into their exisiting projects faster without leaving their existing toolchain.

### Solution overview

This hackathon picked up a subset of problem statement. Allow developers to start adding auth infrastructure to their:

- Web applications
  - Full Stack Authentication
  - SSO
  - API Authentication
- MCP servers
- AI agents

Scalekit is chosed as the first provider of this infrastructure just because I work at scalekit and have good context to build this prototype.

### Setup & Run

![](/assets/docs/why-locksmith/1.png)

Use the CLI in two modes

#### Quicktry without installation

```bash
npx locksmith-cli generate
```

#### Install globally

```bash
npm install -g locksmith-cli
```

![](/assets/docs/why-locksmith/2.png)

#### Models & Data

- Depends on the models, especially distributed by CLI first tools like Claude Code, Gemini, Jules, Codex and Cursor Agent. In this project, Claude Code is used, but Gemini and Cursor Agent are also supported.
- Depends on the data, especially the project codebase and the infrastructure specifics. This data is collected by the CLI and stored in the `~/.locksmith/*.json` files.

#### Evaluation & guardrails

- The AI agent strictly uses account specific identifiers and credentials for best results.
- The AI agent is triggered in `--permission-mode plan` to make sure no destructive actions are taken. Developers review the plan at every step by default; unless they choose not to.

#### Known limitations & risks

- Tools supported: Auth platforms; but can expand to databases, payment gateways, so on
- Auth providers: Scalekit (includes Okta, EntraID, so on); but can expand to workos, supabase, firebase, so on
- Auth modules: Full Stack Authentication, SSO; but can expand to API Authentication, MCP Auth, Auth for AI agents
- LLM brokers: Claude Code, Gemini, Cursor Agent; but can expand to other code tools

Room for optimizations:

- Can make sure CLI does not act if there are uncommited or staged changes by the developer
- Can open up room for developers to instruct AI agent to act or instruct as per their choice
- For the purposes of demo crendetials are not encrypted; since they are stored and used on local machine
- Similar to permission mode in Claude, can add to Gemini and Cursor Agent; else create generated files.

### Team

Saif Ali Shaik, Hacksmith

## Pitch

### Problem and Who cares

Developers who want to integrate new modules to their exisiting projects in their first hour of discovery, and start building on top of it.

- Managers who care about velocity
- Founders who care about time to market
- Developers who care about faster time to complete solution

### Insight & Why now

AI running on browser vs. AI tools on Code Editors

Both of them do not have direct access shell. Access to shell is crucial for development workflows.

**Why now?**

Now, ability to make decisions has come to shell via tools like Claude Code. This tool chain into shell can be super powerful. Shell can spawn processes to Browser, Code Editors and within Shell to run processes and yet giving control to the developer via command line interface.

I belive more and more tools, will come into picture chaining into these workflows. This opens up a whole new world of possibilities in underdeterministic workflows.

[Watch Demo](https://screen.studio/share/VeB0gLlI)

### Value & GTM

There are multiple angles, that worth thinking deeper

- The products and providders maybe interested to pay, because they see product adoption
- Developers are interested to use, because it effectively gets them to "work mode" without "study or research modes"
- Instead of offloading the entirely to claude code equivalents, if we can use their APIs, there is a chance to be marginally profitable.
- Distribution wise Open Source makes sense, because first mover advantage for developer tool like this, neeeds frictionless adoption and price it on future features
- Think about revenue sharing between the product and the tool. For example, 5000 calls via CLI cost $1, then the CLI might take $0.05

### Roadmap

- [ ] Go in-depth with one auth provider and find and tap into adoption and learn the challenges.
- [ ] (long term) Build different flows for modules and make it robust so that LLMs can choose to run natively like a linux command
- [ ] Push this into developer resources for any product, so that inbound growth and discovery begins to rise.
- [ ] Work on transperancy: tokens used, commands executed, etc.. Bring more control to the developer and make it lot more smoother.
-