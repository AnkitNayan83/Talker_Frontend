"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Image } from "lucide-react";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostSchema } from "@/schemas";
import * as z from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ImageUploadInput } from "./image-upload-input";

export const PostForm = () => {
    const form = useForm<z.infer<typeof PostSchema>>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            body: "",
            image: "",
        },
    });

    const handelSubmit = (values: z.infer<typeof PostSchema>) => {
        console.log(values);
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
                    <Button className="mt-4 w-60" type="submit">
                        Post
                    </Button>
                </div>
            </form>
        </Form>
    );
};
