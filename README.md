# Bookmark Manager

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/silambarasan-rd/bookmark-manager)
[![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://bookmark-manager-omega-pink.vercel.app/)

A modern bookmark management application built with Next.js 15, Prisma, PostgreSQL, and Clerk authentication. This app allows users to create, view, and manage their bookmarks with a clean, responsive interface.

## Features

- 🔐 **Authentication**: Secure user authentication with Clerk
- 📚 **Bookmark Management**: Create, read, and delete bookmarks
- 🎨 **Modern UI**: Clean and responsive design
- 🚀 **Serverless**: Deployed on Vercel with edge functions
- 🔗 **MCP Integration**: Model Context Protocol support for AI assistants
- 📱 **Mobile Friendly**: Responsive design for all devices

## Live Demo

🌐 **Application**: [https://bookmark-manager-omega-pink.vercel.app/](https://bookmark-manager-omega-pink.vercel.app/)

🤖 **MCP Endpoint**: [https://bookmark-manager-omega-pink.vercel.app/mcp](https://bookmark-manager-omega-pink.vercel.app/mcp)

The application is automatically deployed to Vercel whenever changes are pushed to the `main` branch.

## Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Deployment**: Vercel
- **Styling**: CSS Modules
- **TypeScript**: Full type safety

## Prerequisites

- Node.js 18+ 
- PostgreSQL database (local or hosted)
- Clerk account for authentication

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd bookmark-manager
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/bookmark_manager?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Optional: Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### 4. Database Setup

Generate Prisma client and run migrations:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Optional: View your data in Prisma Studio
npx prisma studio
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Database Schema

The application uses a simple bookmark model:

```prisma
model Bookmark {
  id        String   @id @default(cuid())
  url       String
  title     String
  notes     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    String   // Clerk User ID
}
```

## API Endpoints

### Bookmarks API

- `GET /api/bookmarks` - Get all bookmarks for authenticated user
- `POST /api/bookmarks` - Create a new bookmark
- `DELETE /api/bookmarks/[id]` - Delete a bookmark by ID

### MCP Integration

- `GET /mcp` - MCP server endpoint for AI assistant integration
- **Live MCP Endpoint**: [https://bookmark-manager-omega-pink.vercel.app/mcp](https://bookmark-manager-omega-pink.vercel.app/mcp)

The MCP endpoint allows AI assistants to interact with your bookmarks, enabling you to:
- View all your bookmarks
- Create new bookmarks
- Manage your bookmark collection through natural language

## Deployment

### Deploy on Vercel

This project is configured for continuous deployment with Vercel. Any push to the `main` branch automatically triggers a deployment.

1. **Set up PostgreSQL Database**:
   - Use Vercel Postgres, Neon, Supabase, or any PostgreSQL provider
   - Get your connection string

2. **Configure Environment Variables**:
   - Go to your Vercel project → Settings → Environment Variables
   - Add all required environment variables from your `.env` file

3. **Deploy**:
   ```bash
   git add .
   git commit -m "Deploy bookmark manager"
   git push origin main
   ```

The build process will automatically:
- Generate Prisma client
- Run database migrations
- Build the Next.js application
- Deploy to: [https://bookmark-manager-omega-pink.vercel.app/](https://bookmark-manager-omega-pink.vercel.app/)

### Build Configuration

The application includes optimized build scripts:

```json
{
  "scripts": {
    "dev": "prisma generate && next dev --turbopack",
    "build": "prisma generate --no-engine && prisma migrate deploy && next build --turbopack",
    "postinstall": "prisma generate",
    "start": "next start"
  }
}
```

## Recent Updates

### Database Migration (October 2025)

- ✅ Migrated from SQLite to PostgreSQL for production compatibility
- ✅ Updated Prisma schema and build scripts
- ✅ Fixed Next.js 15 compatibility issues with dynamic route parameters
- ✅ Optimized build process with proper Prisma client generation

### Build Improvements

- ✅ Added proper Prisma client generation in build pipeline
- ✅ Configured database migrations to run during deployment
- ✅ Updated Next.js configuration to handle ESLint and TypeScript issues
- ✅ Fixed dynamic route parameter handling for Next.js 15

## Development

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── bookmarks/     # Bookmark CRUD operations
│   ├── [transport]/       # MCP integration endpoint
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── BookmarkCard.tsx
│   ├── BookmarkForm.tsx
│   └── BookmarkList.tsx
├── generated/             # Generated Prisma client
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── types/                 # TypeScript type definitions
```

### Adding New Features

1. Create new components in `src/components/`
2. Add API routes in `src/app/api/`
3. Update types in `src/types/`
4. Add utility functions in `src/lib/`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.