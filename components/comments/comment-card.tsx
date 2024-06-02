"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { Heart, MessageCircle } from "lucide-react";
import { Comment, Post } from "@/lib/types";
import { CommentForm } from "../comments/comment-form";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useCurrentUser } from "@/hooks/user";
import { HeartFilled } from "../heart-filled";
import { usePostLike } from "@/hooks/post";
import { toast } from "sonner";
import { getPostById, like, unlike } from "@/actions/post";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CommentCardProps {
    comment: Comment;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
    const user = useCurrentUser();
    const [showComments, setShowComments] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [currComment, setCurrComment] = useState<Comment>(comment);
    const [isLiked, setIsLiked] = useState(false);
    const router = useRouter();

    const handleLike = (type: "like" | "unlike") => {
        if (isPending) return;
        if (!user) {
            toast.error("Please login to like a post");
            return;
        }
        if (type === "like") {
            startTransition(() => {
                like(currComment.id)
                    .then((res) => {
                        if (res?.error) {
                            if (res.error === "unauthorized" || res.error === "TOKEN ERROR") {
                                toast.error("Your session has expired please login again");
                                signOut();
                            } else toast.error(res.error);
                            // setIsLiked(false);
                        }
                        if (res.success) {
                            // setIsLiked(true);
                            toast.success("Post liked");
                        }
                    })
                    .catch(() => {
                        toast.error("Something went wrong");
                        // setIsLiked(false);
                    });
            });
        } else {
            startTransition(() => {
                unlike(currComment.id)
                    .then((res) => {
                        if (res?.error) {
                            if (res.error === "unauthorized" || res.error === "TOKEN ERROR") {
                                toast.error("Your session has expired please login again");
                                signOut();
                            } else toast.error(res.error);
                            // setIsLiked(true);
                        }
                        if (res.success) {
                            toast.success("Post unliked");
                            // setIsLiked(false);
                        }
                    })
                    .catch(() => {
                        toast.error("Something went wrong");
                        // setIsLiked(true);
                    });
            });
        }
    };

    // useEffect(() => {
    //     const updatePost = async () => {
    //         const updatedPost = await getPostById(currPost.id);
    //         if (updatedPost?.error) {
    //             toast.error(updatedPost.error);
    //         }
    //         if (updatedPost?.post) {
    //             setCurrPost(updatedPost.post);
    //         }
    //     };
    //     updatePost();
    // }, [isLiked]);

    return (
        <Card className="p-2 bg-gray-100 dark:bg-gray-800/90 md:w-full">
            <CardTitle className="p-2">
                <div
                    onClick={() => router.push(`/user?username=${currComment.user.userName}`)}
                    className="flex items-center gap-2 hover:underline cursor-pointer"
                >
                    <Image
                        src={currComment.user?.profileImage || "/user.png"}
                        width={40}
                        height={40}
                        alt={"logo"}
                        className="object-cover rounded-full"
                    />
                    <p>{currComment.user.userName}</p>
                </div>
            </CardTitle>

            <CardContent className="flex flex-col items-start">
                <CardDescription className="font-[600] text-[18px] my-2">
                    <p>{currComment.body}</p>
                </CardDescription>
            </CardContent>

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
                    <MessageCircle
                        className="hover:text-blue-500 cursor-pointer ml-2"
                        onClick={() => setShowComments(!showComments)}
                    />
                </div>

                {showComments && <CommentForm postId={currComment.id} />}
            </CardFooter>
        </Card>
    );
};
