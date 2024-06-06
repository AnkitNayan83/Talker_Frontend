import { Comment } from "@/lib/types";
import { useCurrentUser } from "./user";

interface CommentLikeProps {
    comment: Comment;
}

export const useCommentLike = ({ comment }: CommentLikeProps) => {
    const user = useCurrentUser();
    if (!user) return false;
    const likes = comment.likes;
    if (!likes) return false;
    const bl = likes.some((like) => like.userId === user.id);
    return bl;
};
