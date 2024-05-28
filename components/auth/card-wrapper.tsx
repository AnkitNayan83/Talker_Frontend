"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Backbutton } from "./back-button";
import { Header } from "./header";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButton: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButton,
    backButtonHref,
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md ">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter>
                <Backbutton label={backButton} href={backButtonHref} />
            </CardFooter>
        </Card>
    );
};
