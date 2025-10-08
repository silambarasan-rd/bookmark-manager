export type Bookmark = {
  id: string;
  url: string;
  title: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateBookmarkData = {
  url: string;
  title: string;
  notes: string | null;
};