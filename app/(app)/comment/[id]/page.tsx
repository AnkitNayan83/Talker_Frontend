import { getComment } from "@/actions/comment";
import { SingleCommentCard } from "@/components/comments/single-comment-card";

interface CommentPageProps {
    params: {
        id: string;
    };
}

const CommentPage = async ({ params }: CommentPageProps) => {
    const id = params.id;

    const res = await getComment(id);

    if (res?.error) {
        return (
            <div className="min-h-screen">
                <h1 className="flex items-center fint-semibold">{res?.error}</h1>
            </div>
        );
    }

    if(res?.comment) {

        return (
            <div className="flex items-start justify-center w-full mt-4">
            <SingleCommentCard comment={res.comment} />
        </div>
    );
}
};

export default CommentPage;
