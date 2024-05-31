import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
    firstName: string;
    lastName: string;
    isMember: boolean;
    access_token: string;
    userName: string;
    emailVerified: Date | null;
    hasNotification: boolean;
    isMember: boolean;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
    interface User {
        firstName: string;
        lastName: string;
        isMember: boolean;
        token: string;
        userName: string;
        emailVerified: Date | null;
        hasNotification: boolean;
        isMember: boolean;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        firstName: string;
        lastName: string;
        isMember: boolean;
        access_token: string;
        userName: string;
        emailVerified: Date | null;
        hasNotification: boolean;
        isMember: boolean;
    }
}
