"use client";

import { IPost } from "@/models";
import { useContext, useEffect, useState } from "react";
import { IPostsGetRequest } from "@/app/api/posts/route";
import Card from "./card";
import Paginator from "./paginator";
import { PostsContext } from "@/app/page";
import SearchBar from "./searchBar";

export interface ICardDeckProps {
    cards?: IPost[];
    pagination?: boolean;
    currentPage?: number;
    backgroundColor?: string;
    colSpan?: number;
    cols?: number;
    itemsPerPage: number;
}

export default function CardDeck({
    pagination = false,
    colSpan = 12,
    backgroundColor,
    cols = 2,
    itemsPerPage = 8,
}: ICardDeckProps) {
    const postsContext = useContext(PostsContext);
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
            ...postsContext.pageQuery,
            perPage: itemsPerPage,
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
    }, [postsContext]);

    const updateQuery = (query: IPostsGetRequest) => {
        console.log(query);
        postsContext.setPageQuery(query);
        getPosts();
    };

    const setPage = (newPage: number) => {
        let newParams = postsContext.pageQuery;
        newParams.page = newPage;
        postsContext.setPageQuery(newParams);
        getPosts();
    };

    const updateList = (newPosts: IPost[]) => {
        if (!newPosts || newPosts.length === 0) return;
        if (!pagination && postsContext.pageQuery.page !== 1) {
            console.log("posts extended");
            const newPostList = [...posts, ...newPosts];
            setPosts(newPostList);
        } else {
            console.log("posts replaced");
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
                {/*
                Commented out because refactoring needed to fix: carddeck on both pages would share the same context which causes unexpected behaviour
                <SearchBar
                    currentQuery={postsContext.pageQuery}
                    setQuery={updateQuery}
                /> */}
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
                            disabled={postsContext.pageQuery.page === lastPage}
                            type="button"
                            onClick={() =>
                                postsContext.setPageQuery({
                                    ...postsContext.pageQuery,
                                    page: postsContext.pageQuery.page + 1,
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
                            currentPage={postsContext.pageQuery.page}
                            lastPage={lastPage}
                            setPage={setPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
