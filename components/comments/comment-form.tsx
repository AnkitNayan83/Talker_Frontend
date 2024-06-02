"use client";

import { CommentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import { SendHorizonal } from "lucide-react";
import { Input } from "../ui/input";
import { comment } from "@/actions/comment";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

interface CommentFormProps {
    postId: string;
    refetch: boolean;
    setRefetch: (value: boolean) => void;
}

export const CommentForm = ({ postId, setRefetch, refetch }: CommentFormProps) => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof CommentSchema>>({
        resolver: zodResolver(CommentSchema),
        defaultValues: {
            data: "",
        },
    });

    const handelSubmit = async (values: z.infer<typeof CommentSchema>) => {
        startTransition(() => {
            comment(values, postId)
                .then((res) => {
                    if (res.error) {
                        form.reset();
                        if (res.error === "unauthorized" || res.error === "TOKEN ERROR") {
                            toast.error("Your session has expired please login again");
                            signOut();
                        } else {
                            toast.error(res.error);
                        }
                    }

                    if (res.success) {
                        setRefetch(true);
                        form.reset();
                        toast.success("Comment added successfully");
                        setRefetch(!refetch);
                    }
                })
                .catch(() => {
                    toast.error("Something went wrong");
                });
        });
    };

    return (
        <Form {...form}>
            <form className="w-full mb-8" onSubmit={form.handleSubmit(handelSubmit)}>
                <div className="flex items-center gap-4">
                    <div className="flex-bg-red-400 flex-[5]">
                        <FormField
                            control={form.control}
                            name="data"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="comment"
                                            disabled={isPending}
                                            className="w-full h-10 p-2"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        variant={"ghost"}
                        className="flex-[1] h-10 p-0"
                        type="submit"
                        disabled={isPending}
                    >
                        <SendHorizonal className="w-full text-blue-500 h-full" />
                    </Button>
                </div>
            </form>
        </Form>
    );
};
