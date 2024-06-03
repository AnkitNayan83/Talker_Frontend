import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Notification } from "./notification";
import { ExtendedUser } from "@/next-auth";
import { UserButton } from "./auth/user-button";
import { ModeToggle } from "./dark-mode";

interface SideBarProps {
    user: ExtendedUser | undefined;
}

export const SideBar = ({ user }: SideBarProps) => {
    return (
        <Sheet>
            <SheetTrigger>
                <MenuIcon className="h-6 w-6 font-bold" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#222] w-[250px]">
                <div className="mt-8 flex flex-col items-start gap-4">
                    <Notification user={user} />
                    <ModeToggle />
                    <Link
                        href={"/post"}
                        className="font-semibold text-lg hover:bg-accent p-2 rounded-md w-full cursor-pointer "
                    >
                        Create Talk
                    </Link>
                    <UserButton user={user} />
                </div>
            </SheetContent>
        </Sheet>
    );
};
