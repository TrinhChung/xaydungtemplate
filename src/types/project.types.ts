export interface Project {
  id: string;
  slug: string;
  title: string;
  location?: string;
  year?: string;
  investor?: string;
  area?: string;
  coverUrl?: string;
  gallery?: string[];
  summary?: string;
  contentHtml?: string;
  services?: string[];
  featured?: boolean;
  tags?: string[];
}
