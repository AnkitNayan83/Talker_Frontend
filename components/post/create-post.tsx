import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { PostForm } from "./post-form";

export const CreatePost = () => {
    return (
        <div className="w-full  min-h-screen flex flex-col items-start gap-4 p-4">
            <div className="flex items-center w-full gap-4 text-2xl font-bold mb-16">
                <Link href={"/"}>
                    <MoveLeft />
                </Link>
                <h1>Create a Talk</h1>
            </div>

            <PostForm />
        </div>
    );
};
