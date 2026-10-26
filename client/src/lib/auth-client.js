import { createAuthClient } from "better-auth/react"

// Talks to the Better Auth routes on our server (/api/auth/...).
// The site and the API share one address, so the session cookie is sent
// automatically with every request.
export const authClient = createAuthClient({
  baseURL: window.location.origin,
})
