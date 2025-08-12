import fs from "fs/promises";
import path from "path";
import { NavItem } from "@/components/layout/Navbar/navbar.types";

export interface BzPost {
  ID: number;
  post_title: string;
  post_date: string;
  post_content: string;
  post_status: string;
  post_type: string;
  post_name: string;
  menu_order?: number;
}

const dataPath = path.join(process.cwd(), "public", "json", "bz_posts.json");

async function readAll(): Promise<BzPost[]> {
  const data = await fs.readFile(dataPath, "utf8");
  return JSON.parse(data) as BzPost[];
}

export async function getPublishedPosts(): Promise<BzPost[]> {
  const posts = await readAll();
  return posts.filter(
    (p) => p.post_status === "publish" && p.post_type === "post"
  );
}

export async function getNavItems(): Promise<NavItem[]> {
  const posts = await readAll();
  return posts
    .filter((p) => p.post_type === "nav_menu_item")
    .sort((a, b) => (a.menu_order ?? 0) - (b.menu_order ?? 0))
    .map((p) => ({
      id: p.ID,
      label: p.post_title,
      url: p.post_name === "trang-chu" ? "/" : `/${p.post_name}`,
    }));
}

export async function getPostBySlug(slug: string): Promise<BzPost | undefined> {
  const posts = await readAll();
  return posts.find((p) => p.post_name === slug);
}
