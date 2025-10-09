import { PrismaClient } from "../generated/prisma-client";
import { CreateBookmarkData, Bookmark } from "@/types/bookmark";

const prisma = new PrismaClient();

export async function getUserBookmarks(userId: string): Promise<Bookmark[]> {
  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return bookmarks;
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    throw new Error("Failed to fetch bookmarks");
  }
}

export async function getSingleUserBookmark(userId: string, searchQuery: string): Promise<Bookmark | null> {
  try {
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        userId,
        OR: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          { url: { contains: searchQuery, mode: 'insensitive' } }
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return bookmark;
  } catch (error) {
    console.error("Error fetching bookmark:", error);
    throw new Error(`Failed to fetch a bookmark for the given keyword: ${searchQuery}`);
  }
}

export async function createUserBookmark(userId: string, bookmark: CreateBookmarkData): Promise<Bookmark> {
  try {
    if (!bookmark.url || !bookmark.title) {
      throw new Error("URL and title are required");
    }
    
    const newBookmark = await prisma.bookmark.create({
      data: {
        ...bookmark,
        userId,
      },
    });

    return newBookmark;
  } catch (error) {
    console.error("Error creating bookmark:", error);
    throw new Error("Failed to create bookmark");
  }
}

export async function updateUserBookmark(userId: string, bookmarkId: string, bookmark: CreateBookmarkData): Promise<Bookmark> {
  try {
    if (!bookmarkId) {
      throw new Error("Bookmark ID is required to update.");
    }

    if (!bookmark.url || !bookmark.title) {
      throw new Error("URL and title are required");
    }
    
    const updatedBookmark = await prisma.bookmark.update({
      where: {
        id: bookmarkId
      },
      data: {
        ...bookmark,
        userId,
      },
    });

    return updatedBookmark;
  } catch (error) {
    console.error("Error updating bookmark:", error);
    throw new Error("Failed to update the bookmark");
  }
}

export async function deleteUserBookmark(userId: string, bookmarkId: string): Promise<boolean> {
  try {
    const result = await prisma.bookmark.findFirst({
      where: { id: bookmarkId, userId },
    });
    if (!result) {
      throw new Error("Bookmark not found or Access denied");
    }
    await prisma.bookmark.delete({
      where: { id: bookmarkId, userId },
    });
    return true;
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    throw new Error("Failed to delete bookmark");
  }
}