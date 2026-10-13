# Deploy TeamFlow on Render

This release runs the React frontend and Express API from one Node web service. MongoDB is external. AI is optional until its server credentials are supplied.

1. Copy this release into your local TeamFlow repository. Keep your existing .git directory and personal .env file.
2. Commit and push the updated files to your main branch.
3. In Render, create a Web Service connected to the TeamFlow repository, or create a Blueprint from the included render.yaml.
4. For a manually created service, choose Node, use `npm ci --include=dev && npm run build` as Build Command, `npm start` as Start Command, and `/api/health` as Health Check Path.
5. In service environment settings, set NODE_ENV=production, NODE_VERSION=22, TRUST_PROXY_HOPS=1, and MONGODB_URI to your real MongoDB connection string. Set APP_ORIGIN to the HTTPS URL Render assigns to the service; Render's RENDER_EXTERNAL_URL is also supported when APP_ORIGIN is unset. Configure database network access for the hosting service before deployment.
6. For real AI, add OPENROUTER_API_KEY and AI_MODEL in the service environment. Select a currently supported structured-output model. Redeploy after adding them. Do not put secrets in GitHub or chat.
7. Wait for the service to start, then check `/api/health` returns status ok. The frontend detects the API and opens sign-in rather than sample mode. Register, create a workspace and project, add a task, refresh, sign out, and sign in again.
8. Register a second account and add it by email. Verify that it can edit tasks but cannot create projects or delete tasks as a member. Verify an unrelated account cannot access the workspace API.
9. Generate a real AI plan, edit suggestions, approve, and verify tasks persist after refresh. These steps need your actual configured services.

The free plan is declared explicitly to avoid an implicit paid-service default. Check current hosting limits and provider usage charges before enabling services. This file does not create accounts or activate a service by itself.

Sources: https://render.com/docs/deploy-node-express-app and https://render.com/docs/blueprint-spec
