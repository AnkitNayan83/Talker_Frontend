import Link from "next/link";
import { ModeToggle } from "./dark-mode";
import { SeacrhBar } from "./searchbar";
import { UserButton } from "./auth/user-button";
import { Button } from "./ui/button";
import Image from "next/image";
import { CurrentUser } from "@/lib/auth";
import { SideBar } from "./sidebar";
import { Notification } from "./notification";

export const Navbar = async () => {
    const user = await CurrentUser();
    return (
        <div className="flex items-center justify-between p-4 border-b-2">
            <div>
                <Link href={"/"} className="flex items-center gap-2">
                    <Image
                        src={"/logo.png"}
                        width={40}
                        height={40}
                        className="object-cover"
                        alt={"logo"}
                    />
                    <h1 className="text-lg md:text-2xl font-semibold">Talker</h1>
                </Link>
            </div>
            <div className="hidden md:flex w-[30%] ml-[10%]">
                <SeacrhBar />
            </div>
            <div className=" flex items-center justify-end gap-12 md:gap-6">
                <Notification user={user} />
                <ModeToggle />
                <Button className="hidden md:flex" asChild variant={"ghost"}>
                    <Link href={"/post"} className="font-semibold text-lg">
                        Post
                    </Link>
                </Button>
                <UserButton user={user} />
                <div className="md:hidden">
                    <SideBar />
                </div>
            </div>
        </div>
    );
};
