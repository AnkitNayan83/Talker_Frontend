"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { UploadButton, UploadDropzone } from "@/lib/image-upload";

interface ImageUploadInputProps {
    onChange: (url?: string) => void;
    value: string;
    name?: string;
}

export const ImageUploadInput = ({ onChange, value, name }: ImageUploadInputProps) => {
    if (value) {
        return (
            <div className="relative h-[200px] w-[200px]">
                <Image fill src={value} alt="Upload" className="rounded-md" />
                <Button
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm h-5 w-5 hover:bg-red-500/70"
                    type="button"
                    onClick={() => onChange("")}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        );
    } else {
        return (
            <UploadButton
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
