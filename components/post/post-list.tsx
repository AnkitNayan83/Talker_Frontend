import { Post } from "@/lib/types";
import { PostCard } from "./post-card";

interface PostListProps {
    posts: Post[];
}

export const PostList = ({ posts }: PostListProps) => {
    return (
        <div className="w-full lg:w-[1024px] min-h-[calc(100vh_-_78px)] flex flex-col items-center py-4 gap-4">
            {posts.map((post, i) => (
                <PostCard post={post} key={i} loadComments={false} />
            ))}
        </div>
    );
};
