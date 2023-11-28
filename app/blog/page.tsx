import CardDeck from '@/components/cardDeck'
import { getServerSideProps } from 'next/dist/build/templates/pages'

export default function Blog() {
    return (
        <div className="grid mt-[64px] gap-[24px] h-[659px] max-w-[1116px] grid-cols-12 w-full mx-auto">
            <h1>Blog</h1>
            {/* <CardDeck pagination={true} /> */}
        </div>
    )
}
