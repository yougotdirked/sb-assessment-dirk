import { IPostsGetRequest } from "@/app/api/posts/route";
import {
    faMagnifyingGlass,
    faChevronCircleDown,
    faChevronCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useContext, useState } from "react";
export interface ISearchBarProps {
    setQuery: (query: IPostsGetRequest) => void;
    currentQuery: IPostsGetRequest;
}

export default function SearchBar({ setQuery, currentQuery }: ISearchBarProps) {
    const [search, setSearch] = useState<string>("");

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setQuery({ ...currentQuery, searchPhrase: search, page: 1 });
    };

    const flippedDirection = (input: "asc" | "desc") => {
        if (input === "asc") return "desc";
        else return "asc";
    };

    return (
        <div className="w-full mb-[12px]">
            <form className="flex max-w-[718px]" onSubmit={onSubmit}>
                <label className="rounded-full w-full relative leading-[40px] shadow-md ">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-full w-full pl-[24px]"
                        placeholder="Zoeken"
                    />
                    <button
                        type="button"
                        className={
                            "block absolute w-[32px] right-[6px] h-full text-center leading-12"
                        }
                    >
                        <FontAwesomeIcon
                            size="lg"
                            className={"m-auto"}
                            icon={faMagnifyingGlass}
                        />
                    </button>
                </label>
                <button
                    className="ml-auto"
                    onClick={(e) =>
                        setQuery({
                            ...currentQuery,
                            sortDirection: flippedDirection(
                                currentQuery.sortDirection
                            ),
                            page: 1,
                        })
                    }
                >
                    <FontAwesomeIcon
                        color="#F27623"
                        size="xl"
                        icon={
                            currentQuery.sortDirection === "asc"
                                ? faChevronCircleDown
                                : faChevronCircleUp
                        }
                    ></FontAwesomeIcon>
                </button>
            </form>
        </div>
    );
}
