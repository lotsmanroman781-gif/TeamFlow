# Start here - TeamFlow

This package contains the MERN source, API/security tests, a help guide, and an animated demo video.

## Requirements
Node.js 22 or newer, npm, and Docker (or an existing MongoDB instance).

## Start the full application
Open a terminal in this folder:

```bash
npm ci
cp .env.example .env
docker compose up -d
npm start
```

On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

In another terminal in the same folder:

```bash
npm run dev
```

Open http://localhost:5173. The app starts in demo mode. Click the profile at the bottom of the sidebar to open sign-in, choose Create an account, register, and create your workspace.

## Enable real AI
Set OPENROUTER_API_KEY and AI_MODEL in .env. Choose a currently available OpenRouter model supporting structured output. Restart the backend after editing .env. Keys stay on the server. Provider usage may incur charges.

## What is included
- src/: React interface and task-planner review flow
- server/: Express API, MongoDB models, authentication, permissions, AI integration, tests
- compose.yaml: local MongoDB service
- README.md: architecture, API routes, configuration, and known limitations
- docs/: PDF and Markdown help guide
- demo/: captioned animated MP4 walkthrough

## Verification and scope
The build and 11 automated tests pass. AI tests use mocked provider responses. Live AI calls, MongoDB workflows, concurrency behavior, and end-to-end browser integration have not been verified. This is a portfolio MVP, not a production-certified release. Demo mode uses browser-local sample data and a local planning template.

Run `npm test` to verify automated checks and `npm run build` to create the frontend build. Do not commit .env or upload API keys.
