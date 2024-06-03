"use server";

import axios from "axios";
import { cache } from "react";

export const news = cache(async () => {
    const apiKey = process.env.NEWS_API_KEY!;
    try {
        const { data } = await axios.get(
            `https://newsdata.io/api/1/latest?apikey=${apiKey}&q=india&size=5`
        );
        return { news: data.results };
    } catch (error: any) {
        console.log(error);
        return { error: error?.response?.data?.message || "Something went wrong" };
    }
});
