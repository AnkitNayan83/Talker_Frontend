import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

interface HeaderProps {
    label: string;
}

import React from "react";

export const Header = ({ label }: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <div className={cn("flex items-center gap-2 drop-shadow-md", font.className)}>
                <Image src={"/logo.png"} width={60} height={60} alt={"logo"} />
                <h1 className="text-3xl font-semibold ">Talker</h1>
            </div>
            <p className="text-muted-foreground text-small">{label}</p>
        </div>
    );
};
