import { SinglePostCard } from "@/components/post/single-post-card";

interface SinglePostPageProps {
    params: {
        id: string;
    };
}

const SinglePostPage = ({ params }: SinglePostPageProps) => {
    const id = params.id;
    return <div className="flex flex-col items-center">{/* <SinglePostCard post={id} /> */}</div>;
};

export default SinglePostPage;
