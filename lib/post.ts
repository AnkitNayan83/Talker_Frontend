import { CurrentUser } from "./auth";
import { Post } from "./types";

export const isLikedByUser = async (post: Post) => {
    const user = await CurrentUser();
    if (!user) return false;
    return post.likes?.some((like) => like.userId === user.id);
};

export const isLikedByUserClient = (post: Post, userId: string) => {
    if (userId) return post.likes?.some((like) => like.userId === userId);

    return false;
};
