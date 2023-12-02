"use client";

import CardDeck from "@/components/cardDeck";
import Form from "@/components/form";
import { IPostsGetRequest } from "@/app/api/posts/route";
import { createContext, useState } from "react";
import { PageContextProvider } from "@/components/pageContextProvider";

const initialQuery: IPostsGetRequest = {
    page: 1,
    perPage: 4,
    sortBy: "title",
    sortDirection: "desc",
    searchPhrase: "",
    categoryId: 1,
};

export interface IPageContext {
    pageQuery: IPostsGetRequest;
    setPageQuery: (query: IPostsGetRequest) => void;
}

//todo: refactor
export const PostsContext = createContext<IPageContext>({
    pageQuery: initialQuery,
    setPageQuery: (query: IPostsGetRequest) => {},
});

export default function Home() {
    return (
        <div className="flex flex-col sm:grid mt-[64px] gap-[24px] h-[659px] max-w-[1116px] grid-cols-12 w-full mx-auto">
            <h1 className={"hidden"}>Home</h1>
            <PageContextProvider
                initialQuery={initialQuery}
                context={PostsContext}
            >
                <>
                    <Form />
                    <CardDeck
                        query={initialQuery}
                        colSpan={7}
                        backgroundColor="white"
                        pagination={false}
                    />
                </>
            </PageContextProvider>
        </div>
    );
}
