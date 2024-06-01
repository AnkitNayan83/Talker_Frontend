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

const wordCount = (str: string) => {
    const words = str.trim().split(/\s+/);
    return words.length <= 120;
};

export const PostSchema = z
    .object({
        body: z.string().min(1, { message: "Cannot create an empty talk" }),
        image: z.optional(z.string()),
    })
    .refine(
        (data) => {
            if (!wordCount(data.body)) {
                return false;
            }
            return true;
        },
        {
            message: "Talk must be less than 120 words",
            path: ["body"],
        }
    );

export const CommentSchema = z.object({
    body: z.string().min(1, { message: "Cannot create an empty comment" }),
});
