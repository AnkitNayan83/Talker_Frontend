import Link from "next/link";
import { ModeToggle } from "./dark-mode";
import { SeacrhBar } from "./searchbar";
import { UserButton } from "./auth/user-button";
import { Button } from "./ui/button";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/user";
import { CurrentUser } from "@/lib/auth";

export const Navbar = async () => {
    const user = await CurrentUser();
    return (
        <div className="flex items-center justify-between p-4 border-b-2">
            <div className="flex-1">
                <Link href={"/"} className="flex items-center gap-2">
                    <Image
                        src={"/logo.png"}
                        width={40}
                        height={40}
                        className="object-cover"
                        alt={"logo"}
                    />
                    <h1 className="text-2xl font-semibold">Talker</h1>
                </Link>
            </div>
            <div className="flex-1">
                <SeacrhBar />
            </div>
            <div className="flex-1 flex items-center justify-end gap-10">
                <ModeToggle />
                <Button asChild variant={"ghost"}>
                    <Link href={"/post"} className="font-semibold text-lg">
                        Post
                    </Link>
                </Button>
                <UserButton user={user} />
            </div>
        </div>
    );
};
