import { Post } from "@/lib/types";
import { Loader, MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PostCard } from "./post-card";

interface SinglePostCardProps {
    post: Post;
}

export const SinglePostCard = ({ post }: SinglePostCardProps) => {
    console.log(post);

    if (post === null) {
        return (
            <div className="flex items-center justify-center animate-spin">
                <Loader className="w-6 h-6 text-white" />
            </div>
        );
    }

    return (
        <div className="w-full lg:w-[1024px] min-h-[calc(100vh_-_78px)] flex flex-col items-center p-4 border-l-2 border-r-2">
            <div className="flex items-center justify-start w-full gap-4 text-2xl font-bold mb-16">
                <Link href={"/"}>
                    <MoveLeft />
                </Link>
                <h1>Talk</h1>
            </div>
            <div>
                <PostCard post={post} loadComments />
            </div>
        </div>
    );
};
