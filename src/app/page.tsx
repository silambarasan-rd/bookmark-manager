"use client";

import { useState } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useBookmarks } from "@/hooks/useBookmarks";
import { CreateBookmarkData } from "@/types/bookmark";
import styles from "./page.module.css";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export default function Home() {
  const { bookmarks, loading, error, addBookmark, deleteBookmark, refetch } = useBookmarks();
  const [showAddBookmarkForm, setShowAddBookmarkForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleAddBookmark = async (bookmark: CreateBookmarkData) => {
    try {
      setIsSubmitting(true);
      await addBookmark(bookmark);
      setShowAddBookmarkForm(false);
      refetch();
    } catch (err) {
      console.log("Failed to add bookmark: ", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBookmark = async (id: string) => {
    if (confirm("Are you sure wanna remove this Bookmark ?")) {
      try {
        await deleteBookmark(id);
      } catch (error) {
        console.log('Failed to delete bookmark', error);
      }
    }
  };

  if (loading) {
    return <div className={styles['loading-container']}>
      <div className={styles['loading-content']}>
        <div className={styles['loading-spinner']}></div>
        <p>Loading bookmarks...</p>
      </div>
    </div>
  }

  return (
    <div>
      <SignedIn>
        <div className="container">
          <div className={styles["page-header"]}>
            <div className={styles["header-content"]}>
              <div className={styles["header-text"]}>
                <h1>Bookmark Manager</h1>
                <p>Organize and manage your bookmarks</p>
              </div>
              <div className={styles["header-button"]}>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowAddBookmarkForm(!showAddBookmarkForm)}
                >
                  {showAddBookmarkForm ? "Cancel" : "Add Bookmark"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {error && (
            <div className={styles["error-message"]}>
              <p>Error: {error}</p>
              <button onClick={refetch} className="btn btn-secondary">
                Retry
              </button>
            </div>
          )}

          {showAddBookmarkForm && (
            <div className={styles["form-section"]}>
              <BookmarkForm
                onSubmit={handleAddBookmark}
                isSubmitting={isSubmitting}
              />
            </div>
          )}

          <BookmarkList bookmarks={bookmarks} onDelete={handleDeleteBookmark} />
        </div>
      </SignedIn>
      <SignedOut>
        <div className={styles["signout-container"]}>
          <div className={styles["signout-content"]}>
            <p className={styles["signout-text"]}>
              Please sign in to manage your bookmarks
            </p>
          </div>
        </div>
      </SignedOut>
    </div>
  );
}
