import { auth } from "@/auth";
import { CurrentUser } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handelAuth = async () => {
    const user = await CurrentUser();
    if (!user) throw new Error("Unauthorized");

    return { userId: user.id };
};

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .middleware(async () => await handelAuth())
        .onUploadComplete(async ({}) => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
