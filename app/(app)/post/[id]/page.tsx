import { getPostById } from "@/actions/post";
import { SinglePostCard } from "@/components/post/single-post-card";

interface SinglePostPageProps {
    params: {
        id: string;
    };
}

const SinglePostPage = async ({ params }: SinglePostPageProps) => {
    const id = params.id;
    const data = await getPostById(id);

    if (data?.error) {
        return (
            <div className="flex flex-col items-center text-lg">
                <p>{data.error}</p>
            </div>
        );
    }
    if (data?.post) {
        return (
            <div className="flex flex-col items-center w-full">
                <SinglePostCard loadComments post={data?.post} />
            </div>
        );
    }
};

export default SinglePostPage;
