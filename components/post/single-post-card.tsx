import { Post } from "@/lib/types";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

interface SinglePostCardProps {
    post: Post;
}

export const SinglePostCard = ({ post }: SinglePostCardProps) => {
    console.log(post);
    return (
        <div className="w-full lg:w-[1024px] min-h-[calc(100vh_-_78px)] flex flex-col items-start p-4 border-l-2 border-r-2">
            <div className="flex items-center w-full gap-4 text-2xl font-bold mb-16">
                <Link href={"/"}>
                    <MoveLeft />
                </Link>
                <h1>Talk</h1>
            </div>
        </div>
    );
};
