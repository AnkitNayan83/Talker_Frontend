"use client";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { useCallback, useEffect, useState, useTransition } from "react";
import { verify } from "@/actions/verify";
import { Loader } from "lucide-react";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

export const VerifyEmailForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [isPending, startTransistion] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const handelVerification = useCallback(async () => {
        setError("");
        setSuccess("");
        if (!token) return;
        startTransistion(() => {
            verify(token)
                .then((res) => {
                    if (res?.error) {
                        setError(res.error);
                        setSuccess("");
                    }
                    if (res?.success) {
                        setSuccess(res.success);
                        setError("");
                    }
                })
                .catch(() => {
                    setError("Something went wrong");
                });
        });
    }, [token]);

    useEffect(() => {
        handelVerification();
    }, [handelVerification]);

    return (
        <CardWrapper
            headerLabel="Confirming your account"
            backButtonHref="/login"
            backButton="Back to Login"
        >
            {isPending && (
                <>
                    <div className="flex items-center w-full justify-center mb-2">
                        <Loader className="w-6 h-6 text-gray-500 animate-spin ease" />
                    </div>
                </>
            )}
            {!success && <FormError message={error} />}
            <FormSuccess message={success} />
        </CardWrapper>
    );
};
