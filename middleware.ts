import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
    DEFAULT_LOGIN_REDIRECT,
    LOGOUT_URL,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "./routes";
import { CurrentUser } from "./lib/auth";
import { verifyJWT } from "./actions/verify";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const user = await CurrentUser();

    if (nextUrl.pathname === LOGOUT_URL) {
        return;
    }

    if (user) {
        const token = user.access_token;
        const res = await verifyJWT(token);

        if (res?.error) {
            return Response.redirect(new URL(LOGOUT_URL, nextUrl));
        }

        return;
    }

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return;
    }

    if (isAuthRoutes) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (callbackUrl === "/logout") return Response.redirect(new URL("/login", nextUrl));
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return Response.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
    }

    return;
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
