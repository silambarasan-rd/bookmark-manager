import { PrismaClient, Bookmark } from "../generated/prisma";
import { CreateBookmarkData } from "@/types/bookmark";

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