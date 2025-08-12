export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDesc?: string;
  coverUrl?: string;
  contentHtml?: string;
  highlights?: string[];
  gallery?: string[];
  featured?: boolean;
}
