import { signOut } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    await signOut();
    return new NextResponse("", { status: 200 });
}
