"use server";

import { CurrentUser } from "@/lib/auth";
import api from "@/lib/axiosInstance";
import { PostSchema } from "@/schemas";
import * as z from "zod";

export const post = async (values: z.infer<typeof PostSchema>) => {
    const user = await CurrentUser();
    if (!user) return { error: "Unauthorized" };
    const token = user.access_token;

    const validateFields = PostSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Post Cannot be empty" };
    }

    try {
        const { data } = await api.post("/post", values, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return { post: data.post };
    } catch (error: any) {
        return { error: error?.response?.data?.message || "Something went wrong" };
    }
};

export const getPostById = async (id: string) => {
    if (!id) return null;

    try {
        const { data } = await api.get(`/post/${id}`);

        return { post: data.post };
    } catch (error: any) {
        return { error: error.response.data.message || "Post does not exist" };
    }
};

export const getFeedPosts = async () => {
    try {
        const { data } = await api.get("/post/feed");
        return { posts: data.posts };
    } catch (error: any) {
        return { error: error.response.data.message || "Post does not exist" };
    }
};

export const like = async (postId: string) => {
    const user = await CurrentUser();
    if (!user) return { error: "unauthorized" };
    const token = user.access_token;
    try {
        const { data } = await api.post(
            `/post/${postId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return { success: "liked" };
    } catch (error: any) {
        return { error: error?.response?.data?.message || "Something went wrong" };
    }
};

export const unlike = async (postId: string) => {
    const user = await CurrentUser();
    if (!user) return { error: "unauthorized" };
    const token = user.access_token;
    try {
        const { data } = await api.delete(`/post/unlike/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return { success: "unliked" };
    } catch (error: any) {
        return { error: error?.response?.data?.message || "Something went wrong" };
    }
};

export const deletePost = async (postId: string) => {
    const user = await CurrentUser();
    if (!user) return { error: "unauthorized" };
    const token = user.access_token;
    try {
        await api.delete(`/post/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return { success: "deleted" };
    } catch (error: any) {
        return { error: error?.response?.data?.message || "Something went wrong" };
    }
};
