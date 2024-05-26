import { NextRequest, NextResponse } from "next/server";
import { authRoutes, publicRoutes } from "./routes";
import { VerifyToken } from "./lib/verify-token";

export function middleware(req: NextRequest) {
    // const { cookies } = req;
    // const token = cookies.get("token")?.value;
    // const isLoggedIn = VerifyToken(token);
    // const isAuthRoutes = authRoutes.includes(req.nextUrl.pathname);
    // const isPublicRoutes = publicRoutes.includes(req.nextUrl.pathname);

    // if (isAuthRoutes) {
    //     if (isLoggedIn) {
    //         return NextResponse.redirect("/");
    //     }
    //     return;
    // }

    // if (!isLoggedIn && !isPublicRoutes) {
    //     return NextResponse.redirect("/login");
    // }

    return;
}

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
