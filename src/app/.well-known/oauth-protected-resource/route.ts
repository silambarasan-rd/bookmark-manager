import {
  metadataCorsOptionsRequestHandler,
  protectedResourceHandlerClerk,
} from '@clerk/mcp-tools/next'

const handler = protectedResourceHandlerClerk({
  // Specify which OAuth scopes this protected resource supports
  scopes_supported: ['profile', 'email'],
  // Configure the allowed OAuth clients
  clients: [{
    client_id: process.env.CLERK_MCP_CLIENT_ID,
    client_secret: process.env.CLERK_MCP_CLIENT_SECRET
  }]
})
const corsHandler = metadataCorsOptionsRequestHandler()

export { handler as GET, corsHandler as OPTIONS }