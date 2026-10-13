# TeamFlow 1.1 - Deployment preparation

## Changes
- Running backend is detected automatically; deployed app opens real account sign-in.
- Signed-in account and workspace are restored after refresh.
- Production static files use a stable absolute path.
- Server binds 0.0.0.0 and respects platform PORT.
- Known proxy-hop configuration is supported for request rate limiting.
- Public origin is configured with APP_ORIGIN or Render's assigned external URL.
- MongoDB model indexes are initialized before readiness.
- Graceful shutdown has a bounded timeout.
- Render Blueprint and Dockerfile are provided.
- An optional ephemeral-MongoDB integration test is included.

## Verified on October 13, 2026
- Frontend production build and all 11 existing tests pass.
- MongoDB 8.2.6 integration: account registration, session login/logout, task persistence, member restrictions, cross-workspace access rejection, AI approval ownership, fixed approved selection, and duplicate-save prevention.
- Production startup: database index initialization, /api/health, /api/config, and serving built React HTML.

The integration test's approval case uses a stored test plan; existing provider tests use mocked responses. Real provider inference, browser-driven end-to-end testing, paid account limits, and a public deployment have not been verified. Docker and Render configuration files have not been executed on their target platforms.

## Run checks
npm test
npm run build
npm run test:integration

The optional integration command downloads a MongoDB binary and starts a temporary local database. It does not use MONGODB_URI or erase a user's database. Development dependencies must be installed.

For deployment, follow DEPLOYMENT.md. Add database and provider secrets directly in hosting environment settings. No private credentials are included.

This release keeps the existing MVP scope. Password reset, email invitations, file uploads, real-time synchronization and AI Q&A are not added. Multi-task approval remains resumable rather than transactional, and audit logging may be incomplete after failures.
