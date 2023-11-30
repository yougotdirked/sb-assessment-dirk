import CardDeck from "@/components/cardDeck";
import { IPostsGetRequest } from "@/app/api/posts/route";

const initialQuery: IPostsGetRequest = {
    page: 1,
    perPage: 8,
    sortBy: "title",
    sortDirection: "asc",
    searchPhrase: "",
    categoryId: 1,
};

export default function Blog() {
    return (
        <div className="grid mt-[64px] gap-[24px] h-[659px] max-w-[1116px] grid-cols-12 w-full mx-auto relative">
            <h1 className="invisible sm:visible absolute h-[62px] left-0 right-0 top-[-166px] w-full m-auto text-center text-[#FAFAFA] font-bold text-[48px]">
                Blog
            </h1>
            <CardDeck cols={4} query={initialQuery} pagination={true} />
        </div>
    );
}
