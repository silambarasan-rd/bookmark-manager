import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/.well-known/oauth-authorization-server(.*)',
  '/.well-known/oauth-protected-resource(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return // Allow public access to .well-known endpoints
  await auth.protect() // Protect all other routes
});