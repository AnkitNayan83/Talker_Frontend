"use client";

import { CommentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { SendHorizonal } from "lucide-react";
import { Input } from "../ui/input";

interface CommentFormProps {
    postId: string;
}

export const CommentForm = ({ postId }: CommentFormProps) => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof CommentSchema>>({
        resolver: zodResolver(CommentSchema),
        defaultValues: {
            body: "",
        },
    });

    const handelSubmit = (values: z.infer<typeof CommentSchema>) => {
        console.log(values);
    };

    return (
        <Form {...form}>
            <form className="w-full" onSubmit={form.handleSubmit(handelSubmit)}>
                <div className="flex items-center gap-4">
                    <div className="flex-bg-red-400 flex-[5]">
                        <FormField
                            control={form.control}
                            name="body"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter your thoughts"
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
                        asChild
                        type="submit"
                        disabled={isPending}
                    >
                        <SendHorizonal className="w-4 text-blue-500" />
                    </Button>
                </div>
            </form>
        </Form>
    );
};
