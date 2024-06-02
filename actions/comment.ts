"use server";

import { CurrentUser } from "@/lib/auth";
import api from "@/lib/axiosInstance";
import { CommentSchema } from "@/schemas";
import * as z from "zod";

export const comment = async (values: z.infer<typeof CommentSchema>, postId: string) => {
    const validateFields = CommentSchema.safeParse(values);

    if (!validateFields.success) {
        return {
            error: "Comment cannot be empty",
        };
    }

    const user = await CurrentUser();
    if (!user) {
        return { error: "unauthorized" };
    }
    const token = user.access_token;
    try {
        const { data } = await api.post(`/comment/${postId}`, values, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return { success: "Comment added" };
    } catch (error: any) {
        return { error: error?.response?.data?.message || "Something went wrong" };
    }
};
