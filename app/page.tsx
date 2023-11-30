import CardDeck from "@/components/cardDeck";
import Form from "@/components/form";
import { IPostsGetRequest } from "@/app/api/posts/route";

const initialQuery: IPostsGetRequest = {
    page: 1,
    perPage: 4,
    sortBy: "title",
    sortDirection: "desc",
    searchPhrase: "",
    categoryId: 1,
};

export default async function Home() {
    return (
        <div className="grid mt-[64px] gap-[24px] h-[659px] max-w-[1116px] grid-cols-12 w-full mx-auto">
            <h1 className={"hidden"}>Home</h1>
            <Form />
            <CardDeck
                initialQuery={initialQuery}
                colSpan={7}
                backgroundColor="white"
                pagination={false}
            />
        </div>
    );
}
