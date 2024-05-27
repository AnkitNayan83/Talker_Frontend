import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/login",
        error: "/login",
    },

    callbacks: {
        async signIn({ user }) {
            return true;
        },
        async session({ session, token, user }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.firstName && session.user) {
                session.user.firstName = token.firstName;
            }

            if (token.lastName && session.user) {
                session.user.lastName = token.lastName;
            }

            if (token.isMember && session.user) {
                session.user.isMember = token.isMember;
            }

            if (token.access_token && session.user) {
                session.user.access_token = token.access_token;
            }

            return session;
        },

        async jwt({ token, user }) {
            const isInitialSignIn = !!user;
            if (isInitialSignIn) {
                if (!token.sub) return token;

                const currentUser = await getUserById(token.sub);

                token.firstName = currentUser?.firstName;
                token.lastName = currentUser?.lastName;
                token.isMember = currentUser?.isMember;
                token.access_token = user?.token;
            }
            return token;
        },
    },

    session: { strategy: "jwt" },
    ...authConfig,
});
