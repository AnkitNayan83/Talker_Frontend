import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export const SideBar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <MenuIcon className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent>
                <div className="mt-8 flex flex-col items-center gap-4">
                    <Button asChild className="w-full">
                        <Link href={"/post"} className="font-semibold text-lg">
                            Post
                        </Link>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};
