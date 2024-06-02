import { Post } from "@/lib/types";
import { ExtendedUser } from "@/next-auth";
import { useCurrentUser } from "./user";

interface PostLikeProps {
    post: Post;
}

export const usePostLike = ({ post }: PostLikeProps) => {
    const user = useCurrentUser();
    if (!user) return false;
    return post.likes?.some((like) => like.userId === user.id);
};
