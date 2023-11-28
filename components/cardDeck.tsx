'use client'

import { IPost } from '@/models'
import { useEffect, useState } from 'react'
import { IPostsGetRequest } from '@/pages/api/posts'
import Card from './card'

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
              setPosts(result.data);
            })
    }, [])

    return (
      <div className={`${gridCols ? 'col-span-7' : 'col-span-full'}`}>
        <div
            className={`${
                backgroundColor && `bg-${backgroundColor}`
            } p-[24px]`}
        >
          <div className='flex'>
            <div className="grid grid-cols-2 grow gap-[24px]">
            {
              posts.map((post, index) => 
                <Card post={post} key={index}/>)
            }
            </div>
          </div>
            {!pagination && (
              <div className='flex'>
                <button className="mx-auto bg-[#F27623] mt-[114px]">
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
