"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (data: z.infer<typeof LoginSchema>, callbackUrl: string | null) => {
    const validateFields = LoginSchema.safeParse(data);
    if (!validateFields.success) {
        return { error: "Invalid Field" };
    }

    try {
        await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirectTo: callbackUrl || "/",
        });
        return { success: "Logged in Successfully" };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid credentials",
                    };
                case "AccessDenied":
                    return {
                        error: "Email not verified",
                    };
                default:
                    return {
                        error: "Something went wrong",
                    };
            }
        }

        throw error;
    }
};
