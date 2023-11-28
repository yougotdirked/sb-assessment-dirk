import { IPost } from '@/models'

export interface ICardProps {
    post: IPost
}

export default function ICard(props: ICardProps) {
    return <div className="grid-cols-3 bg-white"></div>
}
