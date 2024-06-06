import { CurrentUser } from "./auth";
import { Comment } from "./types";

export const isLikedByUser = async (comment: Comment) => {
    const user = await CurrentUser();
    if (!user) return false;
    return comment.likes?.some((like) => like.userId === user.id);
};

export const isLikedByUserClient = (comment: Comment, userId?: string) => {
    if (userId) return comment.likes?.some((like) => like.userId === userId);

    return false;
};
