import { auth } from "@/auth";

export const CurrentUser = async () => {
    const session = await auth();
    return session?.user;
};

export const currentRole = async () => {
    const session = await auth();
    return session?.user?.isMember;
};
