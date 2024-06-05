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
            <div className="hidden md:flex flex-col items-start w-full border-2 space-y-4 rounded-md">
                <h1 className="md:text-2xl font-bold text-center w-full">Trending News</h1>
                <Separator />
                {news?.map((item: any) => (
                    <div className="flex flex-col items-center py-2" key={item.article_id}>
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm px-2"
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
