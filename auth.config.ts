import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import api from "./lib/axiosInstance";
import { NextAuthConfig } from "next-auth";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validateFields = LoginSchema.safeParse(credentials);

                if (validateFields.success) {
                    const { email, password } = validateFields.data;
                    try {
                        const res = await api.post("/auth/login", { email, password });
                        return res.data.user;
                    } catch (error) {
                        return null;
                    }
                }

                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
