import Link from "next/link";
import { BzPost } from "@/lib/posts";

export default function PostCard({ post }: { post: BzPost }) {
  return (
    <li className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-medium mb-2">
        <Link href={`/${post.post_name}`}>{post.post_title}</Link>
      </h3>
      <p className="text-sm text-gray-500 mb-2">
        {new Date(post.post_date).toLocaleDateString("vi-VN")}
      </p>
      <p className="text-sm text-gray-700">
        {post.post_content.replace(/<[^>]+>/g, "").slice(0, 120)}...
      </p>
    </li>
  );
}
