"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";

export const SeacrhBar = () => {
    return (
        <div className="flex items-center gap-2 border-2 rounded-md px-2 focus-within:border-white">
            <Input placeholder="Search" className="border-none focus:outline-none" />
            <Search />
        </div>
    );
};
