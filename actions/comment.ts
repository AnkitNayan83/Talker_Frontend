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

export const getPostComments = async (postId: string) => {
    if (!postId) return { error: "Post id is required" };

    try {
        const { data } = await api.get(`/comment/post/${postId}`);
        console.log(data);
        return { comments: data.comments };
    } catch (error: any) {
        return { error: error?.response?.data?.message || "Something went wrong" };
    }
};

export const getComment = async (commentId: string) => {
    try {
        const { data } = await api.get(`/comment/${commentId}`);
        return { comment: data.comment };
    } catch (error: any) {
        return { error: error?.response?.data?.message || "Something went wrong" };
    }
};

export const like = async (commentId: string) => {
    const user = await CurrentUser();
    if (!user) return { error: "unauthorized" };
    const token = user.access_token;
    try {
        const { data } = await api.post(
            `/comment/like/${commentId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return { success: "liked" };
    } catch (error: any) {
        console.log(error);
        return { error: error?.response?.data?.message || "Something went wrong" };
    }
};

export const unlike = async (commentId: string) => {
    const user = await CurrentUser();
    if (!user) return { error: "unauthorized" };
    const token = user.access_token;
    try {
        await api.delete(`/comment/unlike/${commentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return { success: "liked" };
    } catch (error: any) {
        console.log(error);
        return { error: error?.response?.data?.message || "Something went wrong" };
    }
};

export const deleteComment = async (commentId: string) => {
    const user = await CurrentUser();
    if (!user) return { error: "unauthorized" };
    const token = user.access_token;
    try {
        await api.delete(`/comment/${commentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return { success: "Comment deleted" };
    } catch (error: any) {
        return { error: error?.response?.data?.message || "Something went wrong" };
    }
};

export const reply = async (values: z.infer<typeof CommentSchema>, commentId: string) => {
    const user = await CurrentUser();
    if (!user) return { error: "unauthorized" };
    const token = user.access_token;
    try {
        const { data } = await api.post(`/comment/reply/${commentId}`, values, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return { success: data?.message || "Comment added" };
    } catch (error: any) {
        return { error: error?.response?.data?.message || "Something went wrong" };
    }
};
