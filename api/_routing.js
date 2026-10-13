/**
 * Vercel rewrites /api/:path* to /api/index?__path=:path*.
 * Restore the requested Express URL, including user query parameters.
 */
export function restoreApiPath(req) {
  const url = new URL(req.url || '/api/index', 'http://localhost');
  const route = url.searchParams.get('__path') ?? (typeof req.query?.__path === 'string' ? req.query.__path : null);
  if (route === null) return;
  url.searchParams.delete('__path');
  req.url = `/api/${route.replace(/^\/+/, '')}${url.search}`;
}
