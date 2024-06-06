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

interface CommentCardProps {
    comment: Comment;
    refetch: boolean;
    setRefetch: (value: boolean) => void;
}

export const CommentCard = ({ comment, refetch, setRefetch }: CommentCardProps) => {
    const user = useCurrentUser();
    const [isPending, startTransition] = useTransition();
    const [currComment, setCurrComment] = useState<Comment>(comment);
    const [isLiked, setIsLiked] = useState(useCommentLike({ comment }));

    const getComments = useCallback(async () => {
        const data = await getComment(currComment.id);
        if (data?.comment) setCurrComment(data.comment);
    }, [currComment.id, user]);

    useEffect(() => {
        getComments();
    }, [getComments]);

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
                    if (res.success) {
                        toast.success("Post deleted");
                        setRefetch(!refetch);
                    }
                })
                .catch(() => {
                    toast.error("Something went wrong");
                });
        });
    };

    return (
        <Card className="p-2 bg-gray-100 dark:bg-gray-800/90 md:w-full">
            <CardTitle className="p-2 flex items-center justify-between">
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
                <div className="flex items-center gap-2">
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
                        <MessageCircle className="hover:text-blue-500 cursor-pointer ml-2" />
                    </Link>
                    <p>
                        {currComment.commentReplies?.length > 0
                            ? currComment.commentReplies.length
                            : 0}
                    </p>
                </div>
            </CardFooter>
        </Card>
    );
};
