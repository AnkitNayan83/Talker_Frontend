"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { Heart, MessageCircle } from "lucide-react";
import { Post } from "@/lib/types";
import { CommentForm } from "../comments/comment-form";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useCurrentUser } from "@/hooks/user";
import { HeartFilled } from "../heart-filled";
import { usePostLike } from "@/hooks/post";
import { toast } from "sonner";
import { getPostById, like, unlike } from "@/actions/post";
import { signOut } from "next-auth/react";

interface PostCardProps {
    post: Post;
    loadComments: boolean;
}

export const PostCard = ({ post }: PostCardProps) => {
    const user = useCurrentUser();
    const [showComments, setShowComments] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [currPost, setCurrPost] = useState<Post>(post);
    const [isLiked, setIsLiked] = useState(usePostLike({ post: currPost }));

    const handleLike = (type: "like" | "unlike") => {
        if (isPending) return;
        if (!user) {
            toast.error("Please login to like a post");
            return;
        }
        if (type === "like") {
            startTransition(() => {
                like(currPost.id)
                    .then((res) => {
                        if (res?.error) {
                            if (res.error === "unauthorized" || res.error === "TOKEN ERROR") {
                                toast.error("Your session has expired please login again");
                                signOut();
                            } else toast.error(res.error);
                            setIsLiked(false);
                        }
                        if (res.success) {
                            setIsLiked(true);
                            toast.success("Post liked");
                        }
                    })
                    .catch(() => {
                        toast.error("Something went wrong");
                        setIsLiked(false);
                    });
            });
        } else {
            startTransition(() => {
                unlike(currPost.id)
                    .then((res) => {
                        if (res?.error) {
                            if (res.error === "unauthorized" || res.error === "TOKEN ERROR") {
                                toast.error("Your session has expired please login again");
                                signOut();
                            } else toast.error(res.error);
                            setIsLiked(true);
                        }
                        if (res.success) {
                            toast.success("Post unliked");
                            setIsLiked(false);
                        }
                    })
                    .catch(() => {
                        toast.error("Something went wrong");
                        setIsLiked(true);
                    });
            });
        }
    };

    useEffect(() => {
        const updatePost = async () => {
            const updatedPost = await getPostById(currPost.id);
            if (updatedPost?.error) {
                toast.error(updatedPost.error);
            }
            if (updatedPost?.post) {
                setCurrPost(updatedPost.post);
            }
        };
        updatePost();
    }, [isLiked]);

    return (
        <Card className="p-2 md:w-[600px]">
            <CardTitle className="p-2 mb-2">
                <Link href={`/user?username=${currPost.user.userName}`}>
                    <div className="flex items-center gap-2 hover:underline">
                        <Image
                            src={currPost.user?.profileImage || "/user.png"}
                            width={40}
                            height={40}
                            alt={"logo"}
                            className="object-cover rounded-full"
                        />
                        <p>{currPost.user.userName}</p>
                    </div>
                </Link>
            </CardTitle>

            <CardContent className="flex flex-col items-start gap-4">
                <CardDescription className="font-[600] text-[18px] my-6">
                    {currPost.body}
                </CardDescription>
                {currPost.image && (
                    <div className="relative w-full h-[300px]">
                        <Image src={currPost.image} fill alt={"logo"} />
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4 justify-center w-full animate-out">
                <div className="flex items-center gap-4">
                    {isLiked ? (
                        <HeartFilled handleLike={handleLike} />
                    ) : (
                        <Heart
                            onClick={() => handleLike("like")}
                            className="hover:text-red-500 w-6 h-6 cursor-pointer"
                        />
                    )}
                    <MessageCircle
                        className="hover:text-blue-500 cursor-pointer"
                        onClick={() => setShowComments(!showComments)}
                    />
                </div>
                <div>
                    {currPost.likes.length === 0 && <div>Be the first to like</div>}
                    {currPost.likes.length === 1 && (
                        <div>
                            Liked by <strong>{currPost.likes[0].user.userName}</strong>
                        </div>
                    )}
                    {currPost.likes.length > 1 && (
                        <div>
                            Liked by <strong>{currPost.likes[0].user.userName}</strong> and{" "}
                            {currPost.likes.length} others
                        </div>
                    )}
                </div>

                {showComments && <CommentForm postId={currPost.id} />}
            </CardFooter>
        </Card>
    );
};
