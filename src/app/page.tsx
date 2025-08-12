import Image from "next/image";
import fs from "fs/promises";
import path from "path";

interface Post {
  ID: number;
  post_title: string;
  post_date: string;
  post_content: string;
  post_status: string;
  post_type: string;
}

async function getPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), "public", "json", "bz_posts.json");
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data) as Post[];
}

export default async function Home() {
  const posts = (await getPosts()).filter(
    (p) => p.post_status === "publish" && p.post_type === "post"
  );

  return (
    <main>
      <section className="relative h-[400px] w-full">
        <Image
          src="/fashion-ecommerce.png"
          alt="Fashion Ecommerce"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold">Fashion Ecommerce</h1>
        </div>
      </section>
      <section className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Bài viết mới nhất</h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.ID} className="border rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-medium mb-2">{post.post_title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(post.post_date).toLocaleDateString("vi-VN")}
              </p>
              <p className="text-sm text-gray-700">
                {post.post_content.replace(/<[^>]+>/g, "").slice(0, 120)}...
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

