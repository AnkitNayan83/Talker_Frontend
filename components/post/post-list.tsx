import { Post } from "@/lib/types";
import { PostCard } from "./post-card";
import { isLikedByUser } from "@/lib/post";

interface PostListProps {
    posts: Post[];
}

export const PostList = ({ posts }: PostListProps) => {
    return (
        <div className="min-h-screen flex flex-col items-center py-4 gap-4">
            {posts.map(async (post, i) => {
                const isLiked = await isLikedByUser(post);
                return (
                    <PostCard isLikedByUser={isLiked} post={post} key={i} loadComments={false} />
                );
            })}
        </div>
    );
};
