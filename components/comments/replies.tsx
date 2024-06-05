"use client";

import { getComment } from "@/actions/comment";
import { Comment } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import { ReplyForm } from "./reply-form";
import { CommentCard } from "./comment-card";

interface RepliesProps {
    replies: Comment[];
    commentId: string;
}

export const Replies = ({ replies, commentId }: RepliesProps) => {
    const [refetch, setRefetch] = useState(false);
    const [currReplies, setCurrReplies] = useState<Comment[]>(replies);

    const getReplies = useCallback(async () => {
        const res = await getComment(commentId);
        if (res?.comment) setCurrReplies(res.comment.commentReplies);
    }, [refetch, commentId]);

    useEffect(() => {
        getReplies();
    }, [getReplies]);

    return (
        <div className="flex flex-col gap-4 w-full">
            <ReplyForm commentId={commentId} setRefetch={setRefetch} refetch={refetch} />
            {Array.isArray(currReplies) &&
                currReplies.map((reply, i) => (
                    <CommentCard
                        key={reply.id}
                        comment={reply}
                        setRefetch={setRefetch}
                        refetch={refetch}
                    />
                ))}
        </div>
    );
};
