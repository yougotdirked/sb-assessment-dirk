"use client";

import CardDeck from "@/components/cardDeck";
import Form from "@/components/form";
import { IPostsGetRequest } from "@/app/api/posts/route";
import { createContext, useState } from "react";

const initialQuery: IPostsGetRequest = {
    page: 1,
    perPage: 4,
    sortBy: "title",
    sortDirection: "desc",
    searchPhrase: "",
    categoryId: 1,
};

export default function Home() {
    const [query, setQuery] = useState<IPostsGetRequest>(initialQuery);
    return (
        <div className="flex flex-col sm:grid mt-[64px] gap-[24px] h-[659px] max-w-[1116px] grid-cols-12 w-full mx-auto">
            <h1 className={"hidden"}>Home</h1>
            <>
                <Form query={query} setQuery={setQuery} />
                <CardDeck
                    colSpan={7}
                    backgroundColor="white"
                    pagination={false}
                    query={query}
                    setQuery={setQuery}
                />
            </>
        </div>
    );
}
