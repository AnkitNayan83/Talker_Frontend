"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { CardWrapper } from "./card-wrapper";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import api from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSubmit = async (data: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        setIsPending(true);
        try {
            await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirectTo: "/profile",
            });
            setIsPending(false);
            form.reset();
        } catch (error) {
            setError("Invalid credentials");
            setIsPending(false);
            form.reset();
        }
    };

    return (
        <CardWrapper
            headerLabel="Login"
            backButton="Dont have an account?"
            backButtonHref="/register"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            {...field}
                                            placeholder="jhon.doe@gmail.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
