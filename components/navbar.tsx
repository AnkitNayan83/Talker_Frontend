"use client";

import Link from "next/link";
import { ModeToggle } from "./dark-mode";
import { SeacrhBar } from "./searchbar";

export const Navbar = () => {
    return (
        <div className="flex items-center justify-between p-4 border-b-2">
            <div className="flex-1">
                <h1 className="text-4xl font-semibold">Talker</h1>
            </div>
            <div className="flex-1 flex items-center justify-between px-6">
                <div className="flex items-center gap-x-10">
                    <ModeToggle />
                    <SeacrhBar />
                </div>
                <div>
                    <Link href={"/post"} className="font-semibold text-lg">
                        Post
                    </Link>
                    //User Button
                </div>
            </div>
        </div>
    );
};
