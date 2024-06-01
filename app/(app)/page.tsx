import { getFeedPosts, post } from "@/actions/post";
import { PostList } from "@/components/post/post-list";

export default async function Home() {
    const data = await getFeedPosts();

    if (data.error) {
        return (
            <div className="flex flex-col items-center text-lg">
                <p>{data.error}</p>
            </div>
        );
    }

    if (data.posts) {
        return (
            <div className="flex flex-col justify-center items-center">
                <PostList posts={data.posts} />
            </div>
        );
    }
}
