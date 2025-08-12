export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  coverUrl?: string;
  contentHtml: string;
  publishedAt: string;
  tags?: string[];
}
