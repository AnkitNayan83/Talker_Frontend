import * as z from "zod";

export const LoginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Enter a valid email" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.optional(z.string()),
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Email is invalid" }),
    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(6, { message: "Password must be more than 8 characters" })
        .max(32, { message: "Password must be less than 32 characters" }),
});
