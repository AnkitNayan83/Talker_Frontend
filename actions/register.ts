"use server";

import api from "@/lib/axiosInstance";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values);
    if (!validateFields.success) {
        return { error: "Invalid Field" };
    }

    try {
        const { data } = await api.post("/auth/register", values);
        return { success: data.message || "Verification link sent to your email" };
    } catch (error: any) {
        return { error: error?.response?.data?.message || "Something went wrong!" };
    }
};
