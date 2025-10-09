/* eslint-disable @typescript-eslint/no-unused-expressions */
import { verifyClerkToken } from '@clerk/mcp-tools/next'
import { createMcpHandler, withMcpAuth } from '@vercel/mcp-adapter'
import { auth } from '@clerk/nextjs/server'
import { createUserBookmark, getSingleUserBookmark, getUserBookmarks, updateUserBookmark } from '@/lib/bookmark-utils';
import { CreateBookmarkData } from '@/types/bookmark';
import {z} from 'zod';

const handler = createMcpHandler((server) => {
  server.tool(
    'get-user-bookmarks',
    'Get all bookmarks for the authenticated users',
    {},
    async (_, { authInfo }) => {
      try {
        const userId = authInfo!.extra!.userId! as string;
        const bookmarks = await getUserBookmarks(userId);

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(bookmarks)
          }]
        };
      } catch (err) {
        return {
          content: [{
            type: 'text',
            text: `error: ${err}`
          }]
        };
      }
    },
  ),
  server.tool(
    'get-single-user-bookmark',
    'Get a single bookmark using searchQuery for the authenticated user',
    { 
      searchQuery: z.string().describe('The Search query to find a single bookmark')
    },
    async (args, { authInfo }) => {
      try {
        const userId = authInfo!.extra!.userId! as string;
        const bookmark = await getSingleUserBookmark(userId, args.searchQuery);

        if (!bookmark) {
          return {
            content: [{
              type: 'text',
              text: `There is no bookmark found for the given keyword : ${args.searchQuery}`
            }]
          };
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(bookmark)
          }]
        };
      } catch (err) {
        return {
          content: [{
            type: 'text',
            text: `error: ${err}`
          }]
        };
      }
    },
  ),
  server.tool(
    'create-user-bookmark',
    'Create a new bookmark for the authenticated user',
    { 
      url: z.string().describe('The URL of the bookmark to create'),
      title: z.string().describe('The Title of the bookmark'),
      notes: z.string().describe('Additional Notes for the bookmark to create').optional(),
    },
    async (args, { authInfo }) => {
      try {
        const userId = authInfo!.extra!.userId! as string;
        const bookmarkData: CreateBookmarkData = {
          url: args.url,
          title: args.title,
          notes: args.notes || null
        }

        const newBookmark = await createUserBookmark(userId, bookmarkData);

        return {
          content: [{
            type: 'text',
            text: `Created a new bookmark : ${JSON.stringify(newBookmark)}`
          }]
        };
      } catch (err) {
        return {
          content: [{
            type: 'text',
            text: `error: ${err}`
          }]
        };
      }
    }
  ),
  server.tool(
    'update-user-bookmark',
    'Update an existing bookmark by ID for the authenticated user',
    { 
      id: z.string().describe('The ID of the bookmark to be updated'),
      url: z.string().describe('The URL of the bookmark to update'),
      title: z.string().describe('The Title of the bookmark to update'),
      notes: z.string().describe('Additional Notes for the bookmark to update').optional(),
    },
    async (args, { authInfo }) => {
      try {
        const userId = authInfo!.extra!.userId! as string;
        const bookmarkData: CreateBookmarkData = {
          url: args.url,
          title: args.title,
          notes: args.notes || null
        }

        const updatedBookmark = await updateUserBookmark(userId, args.id, bookmarkData);

        return {
          content: [{
            type: 'text',
            text: `Updated the bookmark : ${JSON.stringify(updatedBookmark)}`
          }]
        };
      } catch (err) {
        return {
          content: [{
            type: 'text',
            text: `error: ${err}`
          }]
        };
      }
    }
  )
});

const authHandler = withMcpAuth(
  handler,
  async (_, token) => {
    const clerkAuth = await auth({ acceptsToken: 'oauth_token' })
    return verifyClerkToken(clerkAuth, token)
  },
  {
    required: true,
    resourceMetadataPath: '/.well-known/oauth-protected-resource/mcp',
  },
)

export { authHandler as GET, authHandler as POST }