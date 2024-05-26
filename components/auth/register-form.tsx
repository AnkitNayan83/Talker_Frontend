"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { CardWrapper } from "./card-wrapper";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import axios from "axios";
import { useRouter } from "next/navigation";
import api from "@/lib/axiosInstance";

export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, setIsPending] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            password: "",
            firstName: "",
            lastName: "",
            email: "",
        },
    });

    const handleSubmit = async (data: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        setIsPending(true);
        try {
            const res = await api.post("/auth/register", data);
            if (res.status == 201) {
                setSuccess("User registered successful");
                router.push("/login");
                console.log(res.data);
            } else {
                setError("Invalid credentials");
            }
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
            headerLabel="Register"
            backButton="Already have an account?"
            backButtonHref="/login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} {...field} placeholder="Jhon" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} {...field} placeholder="Doe" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

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
                                            placeholder="jhondoe@example.com"
                                        />
                                    </FormControl>
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
                    <FormError message="" />
                    <FormSuccess message="" />
                    <Button disabled={isPending} type="submit" className="w-full">
                        Regsiter
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
