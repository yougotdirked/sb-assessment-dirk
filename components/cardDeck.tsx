'use client'

import { IPost } from '@/models'
import { useEffect, useState } from 'react'
import { IPostsGetRequest } from '@/pages/api/posts'
import Card from './card'

export interface ICardDeckProps {
    cards?: IPost[]
    pagination?: boolean
    currentPage?: number
    backgroundColor?: string
    initialQuery: IPostsGetRequest
    colSpan?: number
    cols?: number
}

export default function CardDeck({
    pagination = false,
    colSpan = 12,
    backgroundColor,
    initialQuery,
    cols = 2,
}: ICardDeckProps) {
    const [posts, setPosts] = useState<IPost[]>([])
    const [params, setParams] = useState<IPostsGetRequest>(initialQuery)
    const [lastPage, setLastPage] = useState<number>()

    const getPosts = () => {
        const {
            page,
            perPage,
            sortBy,
            sortDirection,
            searchPhrase,
            categoryId,
        }: IPostsGetRequest = params
        console.log(params)
        const queryString = `?page=${page}&perPage=${perPage}&sortyBy=${sortBy}&sortDirection=${sortDirection}&searchPhrase=${searchPhrase}&categoryId=${categoryId}`
        fetch('api/posts' + queryString, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((result) => {
                updateList(result.data)
                setLastPage(result.last_page)
            })
    }

    useEffect(() => {
        getPosts()
    }, [params])

    const loadMore = () => {
        console.log(params)
        let newParams = params
        newParams.page += 1
        setParams(newParams)
        getPosts()
    }

    const updateList = (newPosts: IPost[]) => {
        if (!pagination) {
            const newPostList = [...posts, ...newPosts]
            setPosts(newPostList)
        } else {
            setPosts(newPosts)
        }
    }

    return (
        <div className={`col-span-${colSpan} auto-cols-max`}>
            <div
                className={`${
                    backgroundColor ? `bg-${backgroundColor}` : ''
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
                            onClick={loadMore}
                            className="mx-auto bg-[#F27623] mt-[114px]"
                        >
                            Laad meer
                        </button>
                    </div>
                )}
                {pagination && (
                    <div className={'mx-auto mt-auto'}>paginator here</div>
                )}
            </div>
        </div>
    )
}
