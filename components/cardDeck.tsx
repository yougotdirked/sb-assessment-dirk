"use client";

import { IPost } from "@/models";
import { useEffect, useState } from "react";
import { IPostsGetRequest } from "@/app/api/posts/route";
import Card from "./card";
import Paginator from "./paginator";
import SearchBar from "./searchBar";

export interface ICardDeckProps {
    cards?: IPost[];
    pagination?: boolean;
    currentPage?: number;
    backgroundColor?: string;
    colSpan?: number;
    cols?: number;
    query: IPostsGetRequest;
    setQuery: (query: IPostsGetRequest) => void;
}

export default function CardDeck({
    pagination = false,
    colSpan = 12,
    backgroundColor,
    cols = 2,
    query,
    setQuery,
}: ICardDeckProps) {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [lastPage, setLastPage] = useState<number>();

    const getPosts = () => {
        const {
            page,
            perPage,
            sortBy,
            sortDirection,
            searchPhrase,
            categoryId,
        }: IPostsGetRequest = {
            ...query,
        };
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
    }, [query]);

    const setPage = (newPage: number) => {
        let newParams = query;
        newParams.page = newPage;
        setQuery(newParams);
        getPosts();
    };

    const updateList = (newPosts: IPost[]) => {
        if (!newPosts || newPosts.length === 0) return;
        if (!pagination && query.page !== 1) {
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
                <SearchBar currentQuery={query} setQuery={setQuery} />
                <div className="flex">
                    <div
                        className={`grid ${
                            cols > 2 &&
                            "md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2"
                        } sm:grid-cols-${cols}  grow gap-[24px] `}
                    >
                        {posts.map((post, index) => (
                            <Card post={post} key={index} />
                        ))}
                    </div>
                </div>
                {!pagination && (
                    <div className="flex">
                        <button
                            disabled={query.page === lastPage}
                            type="button"
                            onClick={() =>
                                setQuery({
                                    ...query,
                                    page: query.page + 1,
                                })
                            }
                            className="main mx-auto bg-[#F27623] mt-[114px]"
                        >
                            Laad meer
                        </button>
                    </div>
                )}
                {pagination && (
                    <div className="flex mt-[24px]">
                        <Paginator
                            currentPage={query.page}
                            lastPage={lastPage}
                            setPage={setPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
