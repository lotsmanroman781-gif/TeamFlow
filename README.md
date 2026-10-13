# TeamFlow

A MERN project management application built to demonstrate backend engineering: secure server-side sessions, tenant isolation, role-based permissions, indexed MongoDB models, request validation, pagination, and audit activity.

## Review preview

The hosted frontend starts in **Demo mode** with clearly labeled sample data. Demo edits are saved only in localStorage. It is not a live MongoDB deployment. Account registration and sign-in require running the Express backend with MongoDB. The same React client switches to API mode after successful sign-in.

## Run the complete MERN application

Requirements: Node.js 22+, npm, Docker or a MongoDB instance.

```bash
npm ci
cp .env.example .env
docker compose up -d
npm start
# In a second terminal:
npm run dev
```

Open http://localhost:5173. Register an account (password at least 10 characters), create a workspace, create a project, and add tasks. To add a teammate, they must register first. The owner can promote members to admin.

For a single-origin production deployment, run `npm run build`, set `APP_ORIGIN` to your HTTPS origin, set `NODE_ENV=production`, configure `MONGODB_URI`, then run `npm start`. Terminate HTTPS at your deployment platform. Never commit `.env`.

## Architecture

React/Vite client → Express API → Mongoose/MongoDB. User belongs to organizations through unique memberships. Projects and tasks carry organization IDs. All project/task queries constrain both organization and project; membership is checked before access. Session cookies contain random tokens; only SHA-256 token digests are stored in MongoDB. Passwords use salted scrypt. Session TTL is seven days, checked on each request; MongoDB TTL cleans expired records.

## Permissions

| Operation | Owner | Admin | Member |
|---|---|---|---|
| Read workspace, projects, tasks, members and activity | Yes | Yes | Yes |
| Create and update tasks | Yes | Yes | Yes |
| Create projects, add registered members, delete tasks | Yes | Yes | No |
| Change member/admin roles | Yes | No | No |

Owners cannot be demoted through the role endpoint. Assigned users must belong to the workspace.

## API

Auth: POST `/api/auth/register`, POST `/api/auth/login`, GET `/api/auth/me`, POST `/api/auth/logout`.

Organizations: GET/POST `/api/organizations`.

Within `/api/organizations/:org`: GET/POST `/projects`, GET/POST `/members`, PATCH `/members/:member`, GET `/activity`.

Within `/api/organizations/:org/projects/:project`: GET/POST `/tasks`, PATCH/DELETE `/tasks/:task`.

Task listing supports `page`, `limit` (1–100), `status`, `search`. The client shows the first 100 tasks per project; server pagination supports larger datasets. Health: GET `/api/health` (503 when disconnected).

## Validation

`npm test` checks password salting/verification, role escalation policy, anonymous access, cross-origin mutation rejection, and invalid registration. `npm run build` verifies the client build. MongoDB integration and end-to-end browser testing require a configured MongoDB environment; they are not claimed as completed by these tests.

## Scope and next steps

This version provides accounts, workspaces, registered-member onboarding, projects, task CRUD, board/list views, search/priority filtering and activity. Email invitations, password reset, project deletion, member removal, real-time collaboration and file uploads are not implemented. Audit writes occur after mutations, rather than transactionally; a production system should use MongoDB transactions or an outbox for guaranteed audit consistency. No credentials are embedded.

## AI task planner

The project board includes **Generate task plan**. Enter a goal (15–3,000 characters), review the proposed tasks, edit titles/descriptions/priorities/dates, deselect unwanted items, then explicitly approve. Nothing is added during generation. All new tasks start as unassigned, To do.

In the hosted **demo**, this is a clearly labeled local sample template. It does not contact a model or incur AI charges. In the complete MERN app, set these server-only environment variables:

```dotenv
OPENROUTER_API_KEY=your-server-side-key
AI_MODEL=your-selected-structured-output-model-id
```

Choose a currently available OpenRouter model supporting structured JSON output. Requests use OpenRouter's documented chat completions endpoint with a strict JSON schema and server-side validation. No key is requested or stored in the frontend. The request sends only the entered goal and current project's name/description; it does not send member emails, other projects, or task data.

Backend controls: workspace membership and project ownership scope checks, five generation requests per minute per user, twenty attempts per UTC day per user (stored in MongoDB), 25-second provider timeout, 2,200 output token maximum, at most twelve tasks, and a usage record with model, token counts, reported cost when supplied, duration and success/failure. These request/token limits are not an exact monetary spending cap; use provider account spending limits too.

Routes:
- POST `/api/organizations/:org/projects/:project/ai/plan` with `{ "goal": "..." }` returns a pending plan.
- POST `/api/organizations/:org/projects/:project/ai/plans/:plan/approve` with selected edited tasks and their original `index` values adds them. Only the generating user can approve. The first selection is frozen atomically; unique plan/index keys and upserts make retries avoid duplicates. Multi-task creation is resumable rather than transactional; a failed batch can be retried with the same plan. Plans expire after 24 hours.
- GET `/api/organizations/:org/ai/usage` exposes recent usage to owners/admins.

Tests cover provider request structure, malformed/oversized plans, missing configuration, rate-limit/timeout handling, input bounds and anonymous access in addition to baseline security checks. Provider responses are mocked; live-provider behavior, database quota concurrency, approval retry behavior and browser interaction still require integration verification with a configured MongoDB environment. Approval activity logging is best-effort across failures, as with the existing audit implementation.

Provider reference: https://openrouter.ai/docs/api_reference/overview
