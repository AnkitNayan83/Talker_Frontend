import * as z from "zod";

export const LoginSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
    first_name: z.string().min(1, { message: "First name is required" }),
    last_name: z.optional(z.string().min(1, { message: "Last name is required" })),
    username: z
        .string()
        .min(1, { message: "Username is required" })
        .max(150, { message: "Username must be 150 characters or fewer" })
        .regex(/^[A-Za-z0-9@.+-_]+$/, {
            message: "Username can only contain letters, digits, @/./+/-/_ characters",
        }),
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
