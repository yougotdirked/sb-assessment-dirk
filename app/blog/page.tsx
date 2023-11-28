import CardDeck from '@/components/cardDeck'
import { IPostsGetRequest } from '@/pages/api/posts'

const initialQuery: IPostsGetRequest = {
    page: 1,
    perPage: 8,
    sortBy: 'title',
    sortDirection: 'asc',
    searchPhrase: '',
    categoryId: 1,
}

export default function Blog() {
    return (
        <div className="grid mt-[64px] gap-[24px] h-[659px] max-w-[1116px] grid-cols-12 w-full mx-auto">
            <h1>Blog</h1>
            <CardDeck cols={4} initialQuery={initialQuery} pagination={true} />
        </div>
    )
}
