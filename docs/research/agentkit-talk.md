# AgentKit end-to-end (talk research)

Primary sources only. Researched 2026-08-21.

**Question:** How does AgentKit work end-to-end: connector → connection → connected account → tool call with injected user identity? What is the real GitHub / PR-summarization code?

**Not in catalog:** `https://docs.scalekit.com/agentkit/tool-discovery/` returns 404. Tool listing lives on [optimized tools](https://docs.scalekit.com/agentkit/tools/scalekit-optimized-tools/) and the SDK tool pages.

---

## 1. Object definitions

| Object | Official definition | Source |
| --- | --- | --- |
| **Connector** | Pre-built integration (GitHub, Gmail, Slack, Salesforce, Snowflake…). Each connector exposes a library of tools. | [overview](https://docs.scalekit.com/agentkit/overview/) |
| **Connection** | Config you create once. Holds credentials Scalekit needs to talk to the connector (OAuth app credentials, scopes, redirect URI, or a name for API-key connectors). One connection serves all users. | [overview](https://docs.scalekit.com/agentkit/overview/), [connections](https://docs.scalekit.com/agentkit/connections/) |
| **Connected account** | Per-user instance of a connection. Stores that user’s tokens and auth state. Created when the user authorizes. The agent uses this to act on that user. | [overview](https://docs.scalekit.com/agentkit/overview/), [connected accounts](https://docs.scalekit.com/agentkit/connected-accounts/) |
| **Tool** | Connector-specific action (`github_repo_star`, `github_user_repos_list`, `slack_send_message`). Scalekit supplies the schema and runs the authenticated API call. The agent passes inputs. Scalekit injects the user’s credentials and returns structured output. | [overview](https://docs.scalekit.com/agentkit/overview/), [tools overview](https://docs.scalekit.com/agentkit/tools/overview/) |

Connected-account states: `ACTIVE`, `EXPIRED`, `PENDING_AUTH`, `PENDING_VERIFICATION`, `DISCONNECTED`. Tool calls need `ACTIVE`. Source: [connected accounts](https://docs.scalekit.com/agentkit/connected-accounts/).

A tool schema has `name`, `display_name`, `description`, `provider`, `category`, `input_schema`, `output_schema`. Official sample is `github_issue_create`. Source: [tools overview](https://docs.scalekit.com/agentkit/tools/overview/).

---

## 2. Real setup sequence (dashboard vs code)

### Dashboard (once per environment)

1. Create a Scalekit account at [app.scalekit.com](https://app.scalekit.com).
2. Open **AgentKit → Connections**. New environments ship a default GitHub connection named `github-connect`, with Scalekit-managed credentials and scopes `user:email`, `repo`, `public_repo`. Copy the exact connection name. Source: [quickstart](https://docs.scalekit.com/agentkit/quickstart/).
3. To use your own GitHub OAuth app: **Create Connection → GitHub → Use your own credentials**. Copy the Scalekit redirect URI (`https://<SCALEKIT_ENVIRONMENT_URL>/sso/v1/oauth/<CONNECTION_ID>/callback`). Paste it into the GitHub OAuth app. Enter Client ID and Client Secret. Save. Source: [GitHub connector](https://docs.scalekit.com/agentkit/connectors/github/), [connections](https://docs.scalekit.com/agentkit/connections/).
4. Copy API credentials from **Developers → Settings → API Credentials**: `SCALEKIT_CLIENT_ID`, `SCALEKIT_CLIENT_SECRET`, env URL. Source: [quickstart](https://docs.scalekit.com/agentkit/quickstart/).
5. Production: set **AgentKit → User Verification** to **Custom user verification**. Dev/internal: **Scalekit users only**. Source: [user verification](https://docs.scalekit.com/agentkit/user-verification/).

Most teams create connections in the dashboard. Python can also create them in code with `scalekit_client.connection.create_environment_connection(..., flags=Flags(is_app=True))`. Source: [Python connections](https://docs.scalekit.com/agentkit/sdks/python/connections.md).

### Code (per user)

1. Install SDK. Init `ScalekitClient`.
2. `get_or_create_connected_account` / `getOrCreateConnectedAccount` with `connection_name` + `identifier` (your app user ID).
3. If status ≠ `ACTIVE`, call `get_authorization_link` / `getAuthorizationLink`. Send the hosted-page URL to the user. Scalekit handles the OAuth callback. Source: [authorize](https://docs.scalekit.com/agentkit/tools/authorize/).
4. Production: after OAuth, Scalekit redirects to your `user_verify_url`. Call `verify_connected_account_user` / `verifyConnectedAccountUser` with `auth_request_id` + the same `identifier`. Source: [user verification](https://docs.scalekit.com/agentkit/user-verification/).
5. Discover tools with `list_scoped_tools` / `listScopedTools(identifier, filter.connection_names)`. This is the list you pass to the LLM. Source: [optimized tools](https://docs.scalekit.com/agentkit/tools/scalekit-optimized-tools/).
6. Execute with `execute_tool` / `executeTool`. Pass `identifier` + `connection_name` (or `connected_account_id`). Scalekit injects credentials.

---

## 3. Real SDK method names

Packages: `@scalekit-sdk/node` ([Node SDK](https://docs.scalekit.com/agentkit/sdks/node/)), `scalekit-sdk-python` ([Python SDK](https://docs.scalekit.com/agentkit/sdks/python/)).

| Action | Node (`scalekit.actions` / `scalekit.tools`) | Python (`scalekit_client.actions` / `.tools` / `.connection`) |
| --- | --- | --- |
| Init | `new ScalekitClient(envUrl, clientId, clientSecret)` | `ScalekitClient(env_url=, client_id=, client_secret=)` |
| Upsert connected account | `actions.getOrCreateConnectedAccount` (alias `upsertConnectedAccount`) | `actions.get_or_create_connected_account` (alias `upsert_connected_account`) |
| Auth link | `actions.getAuthorizationLink` | `actions.get_authorization_link` |
| Verify identity | `actions.verifyConnectedAccountUser` | `actions.verify_connected_account_user` |
| Get account (includes credentials) | `actions.getConnectedAccount` | `actions.get_connected_account` |
| Execute tool (high-level) | `actions.executeTool({ toolName, toolInput, identifier, connectedAccountId, connector })` | `actions.execute_tool(tool_name=, tool_input=, identifier=, connection_name=, connected_account_id=)` |
| List tools for one user | `tools.listScopedTools(identifier, { filter })` | `tools.list_scoped_tools(identifier, filter=)` |
| Proxy HTTP | `actions.request({ connectionName, identifier, path, method })` | `actions.request(connection_name=, identifier=, path=, method=)` |

Sources: [Node actions](https://docs.scalekit.com/agentkit/sdks/node/actions/), [Node tools](https://docs.scalekit.com/agentkit/sdks/node/tools/), [Python actions](https://docs.scalekit.com/agentkit/sdks/python/actions/), [Python tools](https://docs.scalekit.com/agentkit/sdks/python/tools.md).

**Env-var clash (do not invent a third name):**

- Quickstart uses `SCALEKIT_ENV_URL`.
- SDK init pages and some example repos use `SCALEKIT_ENVIRONMENT_URL`.

Connection names are workspace-specific. Do not hard-code them in production. Use `GITHUB_CONNECTION_NAME`. Source: [optimized tools](https://docs.scalekit.com/agentkit/tools/scalekit-optimized-tools/).

---

## 4. How identity is injected

The identity you pass is `identifier` (your app’s user ID), not the GitHub username. Scalekit maps `identifier` + connection → connected account → stored tokens.

### Path A — execute tool (recommended)

`execute_tool` / `executeTool` selects the connected account with:

- `identifier` + `connection_name` (dashboard connection name), or
- `connected_account_id` (`ca_…`)

Then: “Your agent passes inputs; Scalekit injects the user’s credentials and returns structured output.” Sources: [overview](https://docs.scalekit.com/agentkit/overview/), [optimized tools](https://docs.scalekit.com/agentkit/tools/scalekit-optimized-tools/).

The GitHub connector first-call also accepts `connector: 'github'` + `identifier` (no connection name). Source: [GitHub connector](https://docs.scalekit.com/agentkit/connectors/github/).

Response is a wrapper. Read `result.data` (Node) / `response.data` (Python).

### Path B — proxy HTTP

`actions.request` forwards `path` to the provider. Scalekit adds auth headers. Source: [custom tools](https://docs.scalekit.com/agentkit/tools/custom-tools.md).

### Path C — raw token

`get_connected_account` can return stored tokens. Official custom-tools guidance: do not take this path for agent tool calls. Use Path A or B.

### Production identity check

Custom verification: Scalekit stores tokens in pending verification, redirects to your `user_verify_url` with `auth_request_id` + `state`, your app reads the user from **session**, then `verify_connected_account_user(auth_request_id, identifier)`. Source: [user verification](https://docs.scalekit.com/agentkit/user-verification/).

---

## 5. Architecture in the docs

```
You (developer)  --configure once-->  Connection (credentials + config)
Your users       --authenticate---->  Connected accounts (per-user auth state)
Your agent       --call tools------>  Tools (pre-built + proxied)
Scalekit tools   --authenticated API call-->  Third-party app (GitHub, Gmail, Slack…)
```

Source: [overview](https://docs.scalekit.com/agentkit/overview.md).

---

## 6. GitHub tools — no PR-summarize in the catalog

GitHub connector: **217 tools**, OAuth 2.0. Source: [GitHub connector](https://docs.scalekit.com/agentkit/connectors/github/).

**There is no `github_pull_request_summarize` tool.**

Closest real tools for a “summarize this PR” demo:

| Tool | What it does | Required inputs |
| --- | --- | --- |
| `github_pull_requests_list` | List PRs in a repo | `owner`, `repo` |
| `github_pull_request_get` | Get one PR | `owner`, `repo`, `pull_number` |
| `github_pull_request_files_list` | Files changed | `owner`, `repo`, `pull_number` |
| `github_pull_request_commits_list` | Commits on a PR | `owner`, `repo`, `pull_number` |

The model writes the summary from those payloads. That is application logic, not a Scalekit tool.

Official GitHub sample is “star a repo” (`github_repo_star`), not PR summary. Source: [quickstart](https://docs.scalekit.com/agentkit/quickstart/).

---

## 7. Example repos

| Repo | What it actually runs |
| --- | --- |
| [scalekit-developers/agent-auth-examples](https://github.com/scalekit-developers/agent-auth-examples) | Gmail fetch; optional GitHub if `GITHUB_CONNECTION_NAME` is set |
| [scalekit-inc/python-connect-demos](https://github.com/scalekit-inc/python-connect-demos) | Gmail / Slack / Salesforce — no `github.py` |
| [scalekit-inc/sample-langchain-agent](https://github.com/scalekit-inc/sample-langchain-agent) | Gmail + LangChain |
| [scalekit-inc/google-adk-agent-example](https://github.com/scalekit-inc/google-adk-agent-example) | Gmail |
| [scalekit-inc/meeting-prep-agent-example](https://github.com/scalekit-inc/meeting-prep-agent-example) | Calendar / Gmail / HubSpot / Slack |

No official repo implements GitHub PR summarization.

---

## Talk one-liner

A **connector** is the GitHub integration. A **connection** is your one-time OAuth app config. A **connected account** is one user after consent. A **tool call** sends `identifier`; Scalekit injects that user’s token. There is no PR-summarize tool — call `github_pull_request_get` (and files/commits) and let the model write the summary.
