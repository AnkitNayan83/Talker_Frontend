"use client";

import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import { ImageDown, Loader, X } from "lucide-react";
import { UploadButton, UploadDropzone } from "@/lib/image-upload";
import axios from "axios";

interface ImageUploadInputProps {
    onChange: (url?: string) => void;
    value: string;
}

export const ImageUploadInput = ({ onChange, value }: ImageUploadInputProps) => {
    const hendleClick = async () => {
        onChange("");
        await axios.delete("api/uploadthing", {
            data: {
                url: value,
            },
        });
    };

    if (value) {
        return (
            <div className="relative h-[200px] w-[400px]">
                <Image fill src={value} alt="Upload" className="rounded-md" />
                <Button
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm h-5 w-5 hover:bg-red-500/70"
                    type="button"
                    onClick={hendleClick}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        );
    } else {
        return (
            <UploadButton
                content={{
                    button(arg) {
                        if (arg.ready)
                            return (
                                <div className="flex items-center gap-2">
                                    <p>Upload Image</p>
                                    <ImageDown />
                                </div>
                            );
                        return (
                            <div>
                                <Loader />
                            </div>
                        );
                    },
                }}
                appearance={{
                    button() {
                        return {
                            background: "hsl(var(--background))",
                            color: "hsl(var(--foreground))",
                        };
                    },
                    allowedContent: {
                        marginLeft: "5px",
                    },
                }}
                className="flex items-start"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    onChange(res?.[0].url);
                }}
                onUploadError={(err) => console.log(err)}
            />
        );
    }
};
