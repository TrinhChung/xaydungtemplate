import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post || post.post_status !== "publish") {
    notFound();
  }
  return (
    <article className="max-w-3xl mx-auto p-6 prose">
      <h1 className="mb-2">{post.post_title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(post.post_date).toLocaleDateString("vi-VN")}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.post_content }} />
    </article>
  );
}
