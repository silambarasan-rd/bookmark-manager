"use client";

import { useState, useEffect } from "react";
import { Bookmark, CreateBookmarkData } from "@/types/bookmark";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    setLoading(true);

    try {
      setError(null);
      const response = await fetch('api/bookmarks');
      if (!response.ok) {
        throw new Error("Failed to fetch bookmarks");
      }
      const data = await response.json();
      setBookmarks(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch bookmarks");
    } finally {
      setLoading(false);
    }
  };

  const addBookmark = async (bookmark: CreateBookmarkData) => {
    setLoading(true);
    try {
      setError(null);
      const response = await fetch('api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookmark),
      });

      if (!response.ok) {
        throw new Error("Failed to add bookmark");
      }
      const data = await response.json();
      setBookmarks((prevBookmarks) => [data, ...prevBookmarks]);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to add bookmark");
    } finally {
      setLoading(false);
    }
  };

  const deleteBookmark = async (id: string) => {
    setLoading(true);
    try {
      setError(null);
      const response = await fetch(`api/bookmarks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Failed to delete bookmark");
      }

      setBookmarks((prevBookmarks) => prevBookmarks.filter((bookmark) => bookmark.id !== id));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to delete bookmark");
    } finally {
      setLoading(false);
    }
  };

  return { bookmarks, loading, error, addBookmark, deleteBookmark, refetch: fetchBookmarks };
};