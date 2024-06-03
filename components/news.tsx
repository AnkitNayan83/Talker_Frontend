import { news } from "@/actions/news";
import Link from "next/link";
import { Separator } from "./ui/separator";

export const News = async () => {
    const res = await news();
    if (res?.error) {
        return null;
    }

    if (res?.news) {
        const news = res.news;
        return (
            <div className="flex flex-col items-start w-full border-2 space-y-4 rounded-md">
                <h1 className="text-2xl font-bold text-center w-full">Trending News</h1>
                <Separator />
                {news?.map((item: any, i: any) => (
                    <div className="flex flex-col items-center py-2">
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm px-2"
                            key={i}
                            href={item.link}
                        >
                            {item.title}
                        </Link>
                        <Separator className="w-full" />
                    </div>
                ))}
            </div>
        );
    }
};
