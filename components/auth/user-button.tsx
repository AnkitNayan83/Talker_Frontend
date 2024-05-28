"use client";

import { useCurrentUser } from "@/hooks/user";
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
                        <Avatar>
                            <AvatarImage src={user?.image || ""} alt="user" />
                            <AvatarFallback className="bg-sky-500">
                                <User2 className="text-white" />
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="end">
                        <LogoutButton>
                            <DropdownMenuItem className="flex items-center justify-between">
                                <p>Sign Out</p>
                                <LogOut className="mr-2 h-4 w-4" />
                            </DropdownMenuItem>
                        </LogoutButton>
                        <DropdownMenuItem>
                            <Link href={"/profile"}>Profile</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            {!user && (
                <div className="flex items-center gap-4">
                    <Button asChild variant={"outline"}>
                        <Link href={"/login"}>Sign In</Link>
                    </Button>
                    <Button asChild variant={"outline"}>
                        <Link href={"/register"}>Sign Up</Link>
                    </Button>
                </div>
            )}
        </div>
    );
};
