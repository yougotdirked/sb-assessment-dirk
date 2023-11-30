"use client";

import { IPost } from "@/models";
import { useEffect, useState } from "react";
import { IPostsGetRequest } from "@/app/api/posts/route";
import Card from "./card";
import Paginator from "./paginator";

export interface ICardDeckProps {
    cards?: IPost[];
    pagination?: boolean;
    currentPage?: number;
    backgroundColor?: string;
    initialQuery: IPostsGetRequest;
    colSpan?: number;
    cols?: number;
}

export default function CardDeck({
    pagination = false,
    colSpan = 12,
    backgroundColor,
    initialQuery,
    cols = 2,
}: ICardDeckProps) {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [params, setParams] = useState<IPostsGetRequest>(initialQuery);
    const [lastPage, setLastPage] = useState<number>();

    const getPosts = () => {
        const {
            page,
            perPage,
            sortBy,
            sortDirection,
            searchPhrase,
            categoryId,
        }: IPostsGetRequest = params;
        const queryString = `?page=${page}&perPage=${perPage}&sortyBy=${sortBy}&sortDirection=${sortDirection}&searchPhrase=${searchPhrase}&categoryId=${categoryId}`;
        fetch("api/posts" + queryString, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((result) => {
                updateList(result.data);
                setLastPage(result.last_page);
            });
    };

    useEffect(() => {
        getPosts();
    }, []);

    const setPage = (newPage: number) => {
        let newParams = params;
        newParams.page = newPage;
        setParams(newParams);
        getPosts();
    };

    const updateList = (newPosts: IPost[]) => {
        if (!newPosts || newPosts.length === 0) return;
        if (!pagination) {
            const newPostList = [...posts, ...newPosts];
            setPosts(newPostList);
        } else {
            setPosts(newPosts);
        }
    };

    return (
        <div className={`col-span-${colSpan} auto-cols-max`}>
            <div
                className={`${
                    backgroundColor ? `bg-${backgroundColor}` : ""
                } p-[24px]`}
            >
                <div className="flex">
                    <div className={`grid grid-cols-${cols} grow gap-[24px]`}>
                        {posts.map((post, index) => (
                            <Card post={post} key={index} />
                        ))}
                    </div>
                </div>
                {!pagination && (
                    <div className="flex">
                        <button
                            disabled={params.page === lastPage}
                            type="button"
                            onClick={() => setPage(params.page + 1)}
                            className="main mx-auto bg-[#F27623] mt-[114px]"
                        >
                            Laad meer
                        </button>
                    </div>
                )}
                {pagination && (
                    <div className="flex mt-[24px]">
                        <Paginator
                            currentPage={params.page}
                            lastPage={lastPage}
                            setPage={setPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
