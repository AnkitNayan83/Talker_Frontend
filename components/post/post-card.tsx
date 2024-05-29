import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { Heart, MessageCircle } from "lucide-react";

export const PostCard = () => {
    return (
        <Card className="p-2 md:w-[600px]">
            <CardTitle className="flex items-center gap-2 justify-start mb-2">
                <Image
                    src={"/logo.png"}
                    width={40}
                    height={40}
                    alt={"logo"}
                    className="object-cover rounded-full"
                />
                <p>Username</p>
            </CardTitle>
            <CardContent className="flex flex-col items-center gap-2">
                <CardDescription className="font-[600] text-[18px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit voluptatibus
                    beatae, commodi architecto quod excepturi culpa incidunt eum iusto eligendi
                    sapiente quam. Ab, assumenda! Aperiam, laborum odio. Voluptatibus, iure culpa?
                </CardDescription>
                <div className="relative w-full h-[300px]">
                    <Image src={"/logo.png"} fill alt={"logo"} />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4 justify-center">
                <div className="flex items-center gap-4">
                    <Heart className="hover:text-red-500" />
                    <MessageCircle className="hover:text-blue-500" />
                </div>
                <div>
                    Liked by <strong>Username</strong> and 10 others
                </div>
            </CardFooter>
        </Card>
    );
};
