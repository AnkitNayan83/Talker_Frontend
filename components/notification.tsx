import { ExtendedUser } from "@/next-auth";
import { Bell, Dot } from "lucide-react";
import { Button } from "./ui/button";

interface NotificationProps {
    user: ExtendedUser | undefined;
}

export const Notification = ({ user }: NotificationProps) => {
    if (!user) return null;
    return (
        <div className="flex items-center justify-between w-full cursor-pointer text-lg font-semibold hover:bg-accent p-2 rounded-md">
            <h1>Notification</h1>
            <div className="relative hover:bg-gray-100 dark:hover:bg-gray-100/10 hover:rounded-full p-2 cursor-pointer">
                <Button
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-1 right-1 shadow-sm h-2 w-2 hover:bg-red-500/70"
                    type="button"
                >
                    <Dot className="h-4 w-4" />
                </Button>
                <Bell className="h-6 w-6" />
            </div>
        </div>
    );
};
