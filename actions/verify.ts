"use server";

import api from "@/lib/axiosInstance";

export const verify = async (token: string) => {
    if (!token) return;

    try {
        await api.post(`/auth/verify-email?token=${token}`);
        return { success: "Email verified successfully" };
    } catch (error: any) {
        return { error: error.response.data.message || "Something went wrong" };
    }
};

export const verifyJWT = async (token: string) => {
    if (!token) return;

    try {
        const { data } = await api.get(`/auth/verify-jwt`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return { success: data.message || "JWT verified successfully" };
    } catch (error: any) {
        return { error: error?.response?.data?.message || "Something went wrong" };
    }
};
