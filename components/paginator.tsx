import { useState } from "react";

export interface IPaginatorProps {
    currentPage: number;
    lastPage?: number;
    setPage: (newPage: number) => void;
}

export default function Paginator({
    currentPage,
    lastPage,
    setPage,
}: IPaginatorProps) {
    const [availablePageButtons, setAvailablePageButtons] = useState<number[]>(
        []
    );

    return (
        <div className="mx-auto">
            <ol className="flex text-[12px] tracking-normal gap-[12px] ">
                <li>
                    <button>{lastPage}</button>
                </li>
                <li>
                    <button>{lastPage}</button>
                </li>
                <li>
                    <button
                        onClick={() => setPage(currentPage + 1)}
                        className="hover:underline hover:text-[#E95E30] text-[#F27623] ml-[12px]"
                    >
                        Volgende pagina
                    </button>
                </li>
            </ol>
        </div>
    );
}
