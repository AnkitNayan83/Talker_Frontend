import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export const { GET, POST } = createRouteHandler({
    router: ourFileRouter,
});

export async function DELETE(req: NextRequest) {
    const data = await req.json();
    const newUrl = data.url.substring(data.url.lastIndexOf("/") + 1);
    const utapi = new UTApi();

    await utapi.deleteFiles(newUrl);

    return new NextResponse("deleted", { status: 200 });
}
