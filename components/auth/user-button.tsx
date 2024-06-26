"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { LogoutButton } from "./logout-button";
import Link from "next/link";
import { Button } from "../ui/button";
import { ExtendedUser } from "@/next-auth";

interface UserButtonProps {
    user: ExtendedUser | undefined;
}

export const UserButton = ({ user }: UserButtonProps) => {
    return (
        <div>
            {user && (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex items-center gap-2 text-lg hover:bg-accent p-2 rounded-md font-semibold">
                            <span>{user.userName}</span>
                            <Avatar>
                                <AvatarImage src={user?.image || ""} alt="user" />
                                <AvatarFallback className="bg-sky-500">
                                    <User2 className="text-white" />
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="end">
                        <DropdownMenuItem>
                            <Link href={"/profile"}>Profile</Link>
                        </DropdownMenuItem>
                        <LogoutButton>
                            <DropdownMenuItem className="flex items-center justify-between">
                                <p>Sign Out</p>
                                <LogOut className="mr-2 h-4 w-4" />
                            </DropdownMenuItem>
                        </LogoutButton>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            {!user && (
                <div className="flex flex-col items-start gap-4 w-[150px]">
                    <Button asChild variant={"outline"} className="w-full">
                        <Link href={"/login"}>Sign In</Link>
                    </Button>
                    <Button className="w-full" asChild variant={"outline"}>
                        <Link href={"/register"}>Sign Up</Link>
                    </Button>
                </div>
            )}
        </div>
    );
};
