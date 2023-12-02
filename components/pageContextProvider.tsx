"use client";

import { IPostsGetRequest } from "@/app/api/posts/route";
import { IPageContext } from "@/app/page";
import { Context, createContext, useState } from "react";

export interface IPageWrapperProps {
    children: React.ReactNode;
    initialQuery: IPostsGetRequest;
    context: Context<IPageContext>;
}

export function PageContextProvider({
    children,
    initialQuery,
    context: postsContext,
}: IPageWrapperProps) {
    const [currentQuery, setCurrentQuery] =
        useState<IPostsGetRequest>(initialQuery);

    return (
        <postsContext.Provider
            value={{ pageQuery: currentQuery, setPageQuery: setCurrentQuery }}
        >
            {children}
        </postsContext.Provider>
    );
}
