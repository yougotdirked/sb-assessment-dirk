import { IPost } from '@/models'

export interface ICardDeckProps {
    cards?: IPost[]
    pagination?: boolean
    gridCols?: number
    currentPage?: number
    backgroundColor?: string
}

export default function CardDeck({
    cards = [],
    pagination = false,
    gridCols,
    backgroundColor,
    currentPage = 0,
}: ICardDeckProps) {
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
