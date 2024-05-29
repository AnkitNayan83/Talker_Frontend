import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "@uploadthing/react/styles.css";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Talker",
    description:
        "Talker is a online platform where people can talk to the world and share their experiences.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <html lang="en">
                <body className={font.className}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </SessionProvider>
    );
}
