"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostSchema } from "@/schemas";
import * as z from "zod";
import { ImageUploadInput } from "./image-upload-input";
import { useState, useTransition } from "react";
import { post } from "@/actions/post";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const PostForm = () => {
    const [isPending, startTransistion] = useTransition();
    const router = useRouter();

    const form = useForm<z.infer<typeof PostSchema>>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            body: "",
            image: "",
        },
    });

    const handelSubmit = (values: z.infer<typeof PostSchema>) => {
        console.log(values);
        startTransistion(() => {
            post(values)
                .then((res) => {
                    console.log(res);
                    if (res?.error) {
                        form.reset();
                        if (res.error === "unauthorized" || res.error === "TOKEN ERROR") {
                            toast.error("Your session has expired please login again");
                            signOut();
                        } else {
                            toast.error(res.error);
                        }
                    }
                    if (res?.post) {
                        const postId = res?.post.id;
                        router.push(`/post/${postId}`);
                        form.reset();
                        toast.success(`Talk created successfully`);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Something went wrong");
                });
        });
    };
    return (
        <Form {...form}>
            <form className="space-y-4 w-full" onSubmit={form.handleSubmit(handelSubmit)}>
                <div className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="body"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Enter your thoughts"
                                        cols={10}
                                        rows={10}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormControl>
                                    <ImageUploadInput
                                        onChange={field.onChange}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button className="mt-4 w-60" type="submit" disabled={isPending}>
                        Post
                    </Button>
                </div>
            </form>
        </Form>
    );
};
