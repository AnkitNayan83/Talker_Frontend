"use client";

import { Comment } from "@/lib/types";
import { CommentForm } from "./comment-form";
import { CommentCard } from "./comment-card";
import { useCallback, useEffect, useState } from "react";
import { getPostComments } from "@/actions/comment";

interface CommentsProps {
    comments: Comment[];
    postId: string;
}

export const Comments = ({ comments, postId }: CommentsProps) => {
    const [refetch, setRefetch] = useState(false);
    const [currComments, setCurrComments] = useState<Comment[]>(comments);

    const getComments = useCallback(async () => {
        const res = await getPostComments(postId);
        if (res?.comments) setCurrComments(res.comments);
    }, [refetch, postId]);

    useEffect(() => {
        getComments();
    }, [getComments]);

    return (
        <div className="flex flex-col gap-4 w-full">
            <CommentForm postId={postId} setRefetch={setRefetch} refetch={refetch} />
            {currComments?.map((comment) => (
                <CommentCard
                    key={comment.id}
                    comment={comment}
                    setRefetch={setRefetch}
                    refetch={refetch}
                />
            ))}
        </div>
    );
};
