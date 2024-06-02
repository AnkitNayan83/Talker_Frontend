import { Comment } from "@/lib/types";
import { useCurrentUser } from "./user";

interface CommentLikeProps {
    comment: Comment;
}

export const useCommentLike = ({ comment }: CommentLikeProps) => {
    const user = useCurrentUser();
    if (!user) return false;
    return comment.likes?.some((like) => like.userId === user.id);
};
