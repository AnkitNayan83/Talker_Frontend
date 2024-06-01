"use client";

import { logOut } from "@/actions/logout";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useTransition } from "react";
import { toast } from "sonner";

const LogoutPage = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleLogout = useCallback(async () => {
        startTransition(() => {
            logOut()
                .then((res) => {
                    toast.success("Session expired please login again");
                    router.push("/login");
                })
                .catch();
        });
    }, [router]);

    useEffect(() => {
        handleLogout();
    }, [handleLogout]);

    return (
        <div>
            <Loader className="animate-spin h-6 w-6 text-white" />
        </div>
    );
};

export default LogoutPage;
