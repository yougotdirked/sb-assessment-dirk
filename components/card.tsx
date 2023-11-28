import { IPost } from '@/models'
import Image from 'next/image'

const imgUrl = process.env.NEXT_PUBLIC_IMAGE_URL

export interface ICardProps {
    post: IPost
}

export default function ICard({ post }: ICardProps) {
    return (
        <div className="col-span-1 mx-auto w-full h-[217px] shadow-md">
            <Image
                height={72}
                width={285}
                src={imgUrl + post.img_url}
                alt={`Image of ${post.title}`}
                className="max-h-[72px] object-cover"
            />
            <div className="p-[16px]">
                <h3 className="mb-[8px]">{post.title}</h3>
                <p>{post.content}</p>
            </div>
        </div>
    )
}
