import Image from "next/image";
import PostList from "@/components/posts/PostList";

export default async function Home() {
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
        <PostList />
      </section>
    </main>
  );
}

