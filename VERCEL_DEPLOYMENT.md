# TeamFlow on Vercel (React + Express Functions + MongoDB Atlas)

The React frontend and Express backend run on the SAME Vercel hostname. There is no Render dependency and no separate CORS domain. `api/index.js` runs as a Vercel Node.js Function and forwards requests to the existing Express `server/app.js`. `server/index.js` remains for running the app locally or on a traditional host.

## 1. Update GitHub

Copy `api/index.js`, `api/_routing.js`, and `vercel.json` from this release to the ROOT of the existing `TeamFlow` repository (`package.json` is at the same level). Keep the rest of the repository files. **Do not place them under `src/` or `server/`.** Commit to `main`. If a previous `vercel.json` proxies to Render, replace it with this file.

## 2. Add environment variables in your existing Vercel project

Vercel Dashboard -> `team-flow` -> Settings -> Environment Variables. Set in the **Production** environment:

- `MONGODB_URI`: your full MongoDB Atlas `mongodb+srv://...` connection string, including `/teamflow` database name.
- `APP_ORIGIN`: `https://team-flow-rose.vercel.app` (no trailing slash).
- `NODE_ENV`: `production` (if not already set by Vercel).
- `TRUST_PROXY_HOPS`: `1`.
- Optionally `OPENROUTER_API_KEY`, `AI_MODEL` for AI features only.

**Never** put `MONGODB_URI` in GitHub, `.env.example`, `VITE_` variables or client-side code. Do not send it to anyone.

Under Settings -> Build and Deployment, use Vite, root directory `./`, build command `npm run build`, output directory `dist`, install command `npm install` (or Vercel defaults), and set Node.js Version to `22.x`.

### Atlas Network Access tradeoff

Vercel Hobby Functions use dynamic egress IPs. MongoDB's Vercel integration documentation states Atlas must allow `0.0.0.0/0` for dynamic IP access. To use this no-card setup, open MongoDB Atlas -> Security -> Network Access -> Add IP Address -> Allow access from anywhere (`0.0.0.0/0`). **This is a security tradeoff:** it allows network connections from any IP, though authentication and TLS are still enforced. Use a long, unique DB user password, grant readWrite on only the `teamflow` database, keep secrets server-side, enable alerts, and do not use this setup for sensitive production data. Restrict IP access again when using a host with fixed egress or private networking.

## 3. Deploy

Vercel -> `team-flow` -> Deployments -> wait for a new deployment after the GitHub commit. If environment variables were added after a build, click Redeploy on the latest deployment so the new variables take effect.

## 4. Verify

- https://team-flow-rose.vercel.app/api/health  -> HTTP 200, `{"status":"ok"}`
- https://team-flow-rose.vercel.app/api/config -> `{"mode":"live",...}`
- Open https://team-flow-rose.vercel.app/, register a new test account, create a workspace/project/task; refresh, log out and log in. Real data should persist in Atlas.

Error troubleshooting:

- 404 for `/api/health`: `api/` files in wrong folder, build didn't deploy function, or rewrite not committed. Check Vercel deployment's **Functions** tab.
- 503 for `/api/health`: missing/incorrect `MONGODB_URI`, database user not authorized, bad URL-encoding of password, or Atlas IP access list. Check Vercel **Logs** for the function invocation.
- API works but registration 403: `APP_ORIGIN` doesn't exactly match the browser origin (`https://team-flow-rose.vercel.app`).
- API 500 from registration: check Vercel logs, MongoDB user permissions, and DB indexes.
- Demo screen: frontend could not read a live `/api/config` response.

For previews under a different hostname, this release intentionally permits `APP_ORIGIN` only; use the production URL when testing authenticated API requests.

Vercel Hobby and Atlas free cluster each have usage/resource limits. Avoid commercial or sensitive deployments on these plans.

Sources:
- https://vercel.com/docs/frameworks/frontend/vite
- https://vercel.com/docs/functions/runtimes/node-js
- https://vercel.com/docs/routing/rewrites
- https://www.mongodb.com/docs/atlas/reference/partner-integrations/vercel/
