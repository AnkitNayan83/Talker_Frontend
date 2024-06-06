"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { Delete, DeleteIcon, EllipsisVertical, Heart, MessageCircle, Trash } from "lucide-react";
import { Comment } from "@/lib/types";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useCurrentUser } from "@/hooks/user";
import { HeartFilled } from "../heart-filled";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCommentLike } from "@/hooks/comment";
import { deleteComment, getComment, like, unlike } from "@/actions/comment";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { Replies } from "./replies";

interface CommentCardProps {
    comment: Comment;
}

export const SingleCommentCard = ({ comment }: CommentCardProps) => {
    const user = useCurrentUser();
    const [isPending, startTransition] = useTransition();
    const [currComment, setCurrComment] = useState<Comment>(comment);
    const [isLiked, setIsLiked] = useState(useCommentLike({ comment }));
    const [showComments, setShowComments] = useState(true);
    const router = useRouter();

    const getComments = useCallback(async () => {
        const data = await getComment(currComment.id);
        if (data?.comment) setCurrComment(data.comment);
    }, [currComment.id]);

    const handleLike = (type: "like" | "unlike") => {
        if (isPending) return;
        if (!user) {
            toast.error("Please login to like a post");
            return;
        }
        const action = type === "like" ? like : unlike;
        startTransition(() => {
            action(currComment.id)
                .then((res) => {
                    if (res?.error) {
                        if (res.error === "unauthorized" || res.error === "TOKEN ERROR") {
                            toast.error("Your session has expired please login again");
                            signOut();
                        } else toast.error(res.error);
                        setIsLiked(type !== "like");
                    }
                    if (res.success) {
                        setIsLiked(type === "like");
                        toast.success(`Post ${type === "like" ? "liked" : "unliked"}`);
                        getComments();
                    }
                })
                .catch(() => {
                    toast.error("Something went wrong");
                    setIsLiked(type !== "like");
                });
        });
    };

    const handleDelete = () => {
        if (isPending) return;
        startTransition(() => {
            deleteComment(currComment.id)
                .then((res) => {
                    if (res?.error) {
                        if (res.error === "unauthorized" || res.error === "TOKEN ERROR") {
                            toast.error("Your session has expired please login again");
                            signOut();
                        } else toast.error(res.error);
                    }
                    if (res?.success) {
                        router.push("/");
                        toast.success("Deleted");
                    }
                })
                .catch(() => {
                    toast.error("Something went wrong");
                });
        });
    };

    return (
        <Card className="px-2 md:w-[760px]">
            <CardTitle className="p-2 flex items-center justify-between">
                <div className="flex flex-col gap-2 items-center">
                    <Link
                        href={`/user?username=${currComment.user.userName}`}
                        className="flex items-center gap-2 hover:underline cursor-pointer"
                    >
                        <Image
                            src={currComment.user?.profileImage || "/user.png"}
                            width={40}
                            height={40}
                            alt={"logo"}
                            className="object-cover rounded-full"
                        />
                        <span>{currComment.user.userName}</span>
                    </Link>
                    <Link
                        href={
                            currComment.postId
                                ? `/post/${currComment.postId}`
                                : `/comment/${currComment.parentCommentId}`
                        }
                        className="text-sm"
                    >
                        Replied to{" "}
                        <span className="text-sky-500 hover:text-sky-600 hover:underline">
                            {currComment.postId
                                ? `post ${currComment.post?.user?.userName}`
                                : `comment ${currComment.parentComment?.user?.userName}`}
                        </span>
                    </Link>
                </div>
                <div>
                    {user?.id === currComment.userId && (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <EllipsisVertical />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="bg-gray-200 dark:bg-gray-700/80  w-[150px] rounded-md mt-1"
                            >
                                <DropdownMenuItem
                                    disabled={isPending}
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => handleDelete()}
                                >
                                    <span>Delete</span>
                                    <Trash />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </CardTitle>
            <Link href={`/comment/${currComment.id}`}>
                <CardContent className="flex flex-col items-start">
                    <CardDescription className="font-[600] text-[18px] my-2">
                        {currComment.body}
                    </CardDescription>
                </CardContent>
            </Link>

            <CardFooter className="flex flex-col items-start gap-4 justify-center w-full animate-out">
                <div className="flex items-center gap-2 mb-4">
                    {isLiked ? (
                        <HeartFilled handleLike={handleLike} />
                    ) : (
                        <Heart
                            onClick={() => handleLike("like")}
                            className="hover:text-red-500 w-6 h-6 cursor-pointer"
                        />
                    )}
                    <p>{currComment.likes?.length > 0 ? currComment.likes.length : 0}</p>
                    <Link href={`/comment/${currComment.id}`}>
                        <MessageCircle
                            className="hover:text-blue-500 cursor-pointer ml-2"
                            onClick={() => setShowComments(!showComments)}
                        />
                    </Link>
                    <p>
                        {currComment.commentReplies?.length > 0
                            ? currComment.commentReplies.length
                            : 0}
                    </p>
                </div>
                {showComments && (
                    <Replies replies={currComment.commentReplies} commentId={currComment.id} />
                )}
            </CardFooter>
        </Card>
    );
};
