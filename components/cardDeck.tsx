"use client";

import { IPost } from "@/models";
import { useContext, useEffect, useState } from "react";
import { IPostsGetRequest } from "@/app/api/posts/route";
import Card from "./card";
import Paginator from "./paginator";
import { PageContextProvider } from "./pageContextProvider";
import { PostsContext } from "@/app/page";

export interface ICardDeckProps {
    cards?: IPost[];
    pagination?: boolean;
    currentPage?: number;
    backgroundColor?: string;
    query: IPostsGetRequest;
    colSpan?: number;
    cols?: number;
}

export default function CardDeck({
    pagination = false,
    colSpan = 12,
    backgroundColor,
    query,
    cols = 2,
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
        }: IPostsGetRequest = postsContext.pageQuery;
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
        console.log("context changed");
        getPosts();
    }, [postsContext]);

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
