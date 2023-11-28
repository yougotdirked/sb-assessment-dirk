import CardDeck from '@/components/cardDeck'
import Form from '@/components/form'

const baseUrl = process.env.BASE_URL
const token = process.env.TOKEN

const getData = async () => {
    const cards = await fetch(baseUrl + '/api/')
    return {
        cards: [],
        categories: [],
    }
}

export default async function Home() {
    const { cards, categories } = await getData()

    return (
        <div className="grid mt-[64px] gap-[24px] h-[659px] max-w-[1116px] grid-cols-12 w-full mx-auto">
            <h1>Home</h1>
            <Form />
            <CardDeck gridCols={7} backgroundColor="white" pagination={false} />
        </div>
    )
}
