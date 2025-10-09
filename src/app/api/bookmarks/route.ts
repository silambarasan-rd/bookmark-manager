import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createUserBookmark, getUserBookmarks, getSingleUserBookmark } from "@/lib/bookmark-utils";

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('search');

    // If search query is provided, search for a specific bookmark
    if (searchQuery) {
      const bookmark = await getSingleUserBookmark(userId, searchQuery);
      if (!bookmark) {
        return NextResponse.json({ error: `Bookmark not found for the keyword: ${searchQuery}` }, { status: 404 });
      }
      return NextResponse.json(bookmark, { status: 200 });
    }

    // Otherwise, get all bookmarks
    const bookmarks = await getUserBookmarks(userId);
    return NextResponse.json(bookmarks, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return NextResponse.json({ error: "Failed to fetch bookmarks" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { url, title, notes } = await request.json();

    if (!url || !title) {
      return NextResponse.json({ error: "URL and title are required" }, { status: 400 });
    }

    const bookmark = await createUserBookmark(userId, { url, title, notes });
    return NextResponse.json(bookmark, { status: 201 });
  } catch (error) {
    console.error("Error creating bookmark:", error);
    return NextResponse.json({ error: "Failed to create bookmark" }, { status: 500 });
  }
}