import Link from "next/link";
import { ModeToggle } from "./dark-mode";
import { SeacrhBar } from "./searchbar";
import { UserButton } from "./auth/user-button";
import { Button } from "./ui/button";
import Image from "next/image";
import { CurrentUser } from "@/lib/auth";
import { SideBar } from "./sidebar";
import { Notification } from "./notification";
import { Separator } from "./ui/separator";

export const Navbar = async () => {
    const user = await CurrentUser();
    return (
        <div className="flex flex-col items-center h-screen py-4 sticky top-0 w-[200px] border-r-2">
            <Link href={"/"} className="flex items-center  gap-2">
                <Image
                    src={"/logo.png"}
                    width={40}
                    height={40}
                    className="object-cover"
                    alt={"logo"}
                />
                <h1 className="text-lg md:text-2xl font-semibold">Talker</h1>
            </Link>
            <Separator className="w-full" />
            <div className="mt-12 flex flex-col items-start gap-12">
                <Notification user={user} />
                <ModeToggle />
                <Link
                    href={"/post"}
                    className="font-semibold text-lg hover:bg-accent p-2 rounded-md w-full cursor-pointer "
                >
                    Create Talk
                </Link>
                <UserButton user={user} />
                <div className="md:hidden">
                    <SideBar />
                </div>
            </div>
        </div>
    );
};
