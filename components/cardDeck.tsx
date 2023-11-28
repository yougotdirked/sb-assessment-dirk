'use client'

import { IPost } from '@/models'
import { useEffect, useState } from 'react'
import { IPostsGetRequest } from '@/pages/api/posts'

export interface ICardDeckProps {
    cards?: IPost[]
    pagination?: boolean
    gridCols?: number
    currentPage?: number
    backgroundColor?: string
    initialQuery: IPostsGetRequest
}

export default function CardDeck({
    pagination = false,
    gridCols,
    backgroundColor,
    initialQuery,
}: ICardDeckProps) {
    const [posts, setPosts] = useState<IPost[]>([])
    const [params, setparams] = useState<IPostsGetRequest>(initialQuery)

    useEffect(() => {
        console.log(JSON.stringify(params))
        const {
            page,
            perPage,
            sortBy,
            sortDirection,
            searchPhrase,
            categoryId,
        }: IPostsGetRequest = params
        const queryString = `?page=${page}&perPage=${perPage}&sortyBy=${sortBy}&sortDirection=${sortDirection}&searchPhrase=${searchPhrase}&categoryId=${categoryId}`
        fetch('api/posts' + queryString, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
            })
    })

    return (
        <div
            className={`${
                backgroundColor && `bg-${backgroundColor}`
            } p-[24px] flex ${gridCols ? 'col-span-7' : 'col-span-full'}`}
        >
            {!pagination && (
                <button className="mx-auto bg-[#F27623] mt-auto">
                    Laad meer
                </button>
            )}
            {pagination && (
                <div className={'mx-auto mt-auto mb-'}>paginator here</div>
            )}
        </div>
    )
}
