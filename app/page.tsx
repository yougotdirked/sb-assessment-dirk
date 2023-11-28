import CardDeck from '@/components/cardDeck'
import Form from '@/components/form'
import { IPostsGetRequest } from '@/pages/api/posts'

const initialQuery: IPostsGetRequest = {
    page: 1,
    perPage: 4,
    sortBy: 'title',
    sortDirection: 'asc',
    searchPhrase: '',
    categoryId: 1,
}

export default async function Home() {
    return (
        <div className="grid mt-[64px] gap-[24px] h-[659px] max-w-[1116px] grid-cols-12 w-full mx-auto">
            <h1>Home</h1>
            <Form />
            <CardDeck
                initialQuery={initialQuery}
                gridCols={7}
                backgroundColor="white"
                pagination={false}
            />
        </div>
    )
}
