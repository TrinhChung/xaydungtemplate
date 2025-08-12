import { getPublishedPosts } from "@/lib/posts";
import PostCard from "./PostCard";

export default async function PostList() {
  const posts = await getPublishedPosts();
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.ID} post={post} />
      ))}
    </ul>
  );
}
