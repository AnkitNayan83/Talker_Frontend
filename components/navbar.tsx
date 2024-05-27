"use client";

import Link from "next/link";

export const Navbar = () => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-4xl font-semibold">Talker</h1>
            </div>
            <div>
                //Search bar
                <Link href={"/post"}>Post</Link>
                //User Button
            </div>
        </div>
    );
};
