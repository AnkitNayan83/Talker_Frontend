"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { Heart, MessageCircle } from "lucide-react";
import { Post } from "@/lib/types";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useCurrentUser } from "@/hooks/user";
import { HeartFilled } from "../heart-filled";
import { usePostLike } from "@/hooks/post";
import { toast } from "sonner";
import { getPostById, like, unlike } from "@/actions/post";
import { signOut } from "next-auth/react";
import { Comments } from "../comments/comment";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Separator } from "../ui/separator";

interface PostCardProps {
    post: Post;
    loadComments: boolean;
}

export const PostCard = ({ post, loadComments }: PostCardProps) => {
    const user = useCurrentUser();
    const [showComments, setShowComments] = useState(loadComments);
    const [isPending, startTransition] = useTransition();
    const [currPost, setCurrPost] = useState<Post>(post);
    const [isLiked, setIsLiked] = useState(usePostLike({ post: currPost }));
    const router = useRouter();

    const updatedPost = useCallback(async () => {
        const updatedPost = await getPostById(currPost.id);
        if (updatedPost?.error) {
            toast.error(updatedPost.error);
        }
        if (updatedPost?.post) {
            setCurrPost(updatedPost.post);
        }
    }, [currPost.id]);

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
                            updatedPost();
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
                            updatedPost();
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

    return (
        <Card className="w-full md:w-[90%]">
            <CardTitle className="p-2 mb-2">
                <Link
                    className="flex items-center gap-2 hover:underline cursor-pointer"
                    href={`/user?username=${currPost.user.userName}`}
                >
                    <Image
                        src={currPost.user?.profileImage || "/user.png"}
                        width={40}
                        height={40}
                        alt={"logo"}
                        className="object-cover rounded-full"
                    />
                    <span>{currPost.user.userName}</span>
                </Link>
            </CardTitle>
            <Separator />

            <CardContent className="flex flex-col items-start gap-4">
                <Link className="w-full" href={`/post/${currPost.id}`}>
                    <CardDescription className="font-[600] text-[18px] my-6">
                        {currPost.body}
                    </CardDescription>
                    {currPost.image && (
                        <div className=" relative w-full h-[300px]">
                            <Image src={currPost.image} fill alt={"logo"} />
                        </div>
                    )}
                </Link>
            </CardContent>
            <Separator className="mb-2" />
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
                            {currPost.likes.length - 1} others
                        </div>
                    )}
                </div>

                {showComments && <Comments comments={currPost.comments} postId={currPost.id} />}
            </CardFooter>
        </Card>
    );
};
