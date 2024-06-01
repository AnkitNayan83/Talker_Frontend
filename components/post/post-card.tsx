import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { Heart, MessageCircle } from "lucide-react";
import { Post } from "@/lib/types";

interface PostCardProps {
    post: Post;
    loadComments: boolean;
}

export const PostCard = ({ post }: PostCardProps) => {
    return (
        <Card className="p-2 md:w-[600px]">
            <CardTitle className="flex items-center gap-2 justify-start mb-2">
                <Image
                    src={post.user.profileImage || "/user.png"}
                    width={40}
                    height={40}
                    alt={"logo"}
                    className="object-cover rounded-full"
                />
                <p>{post.user.userName}</p>
            </CardTitle>
            <CardContent className="flex flex-col items-center gap-2">
                <CardDescription className="font-[600] text-[18px]">{post.body}</CardDescription>
                {post.image && (
                    <div className="relative w-full h-[300px]">
                        <Image src={"/logo.png"} fill alt={"logo"} />
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4 justify-center">
                <div className="flex items-center gap-4">
                    <Heart className="hover:text-red-500" />
                    <MessageCircle className="hover:text-blue-500" />
                </div>
                <div>
                    {post.likes.length !== 0 ? (
                        <div>
                            Liked by <strong>{post.likes[0].user.userName}</strong> and{" "}
                            {post.likes.length} others
                        </div>
                    ) : (
                        <div>
                            <p>Be the first to like</p>
                        </div>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
};
