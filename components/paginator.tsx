import { useEffect, useState } from "react";
import PaginatorButton from "./paginatorButton";

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
    const [availablePageNumbers, setAvailablePageNumbers] = useState<number[]>(
        []
    );
    const [suffixPages, setSuffixPages] = useState<number[]>([]);
    const [prefixPages, setPrefixPages] = useState<number[]>([]);

    useEffect(() => {
        //check which pages should be added to the buttons on the bottom of the page
        let startIndex = 1;
        if (lastPage) {
            startIndex = currentPage - 2 > 0 ? currentPage - 2 : 1; //if
            if (currentPage + 2 > lastPage) {
                startIndex -= 2 - (lastPage - currentPage);
            }
        }
        const numbers: number[] = [];
        for (let index = startIndex; index < startIndex + 5; index++) {
            numbers.push(index);
        }
        setAvailablePageNumbers(numbers);

        //add first pages and last pages to selectable pages:
        const newSuffixPages: number[] = [];
        const newPrefixPages: number[] = [];

        numbers.indexOf(1) === -1 && newPrefixPages.push(1);
        numbers.indexOf(2) === -1 && newPrefixPages.push(2);
        setPrefixPages(newPrefixPages);

        if (lastPage) {
            numbers.indexOf(lastPage - 1) === -1 &&
                newSuffixPages.push(lastPage - 1);
            numbers.indexOf(lastPage) === -1 && newSuffixPages.push(lastPage);
            setSuffixPages(newSuffixPages);
        }
    }, [currentPage, lastPage]);

    return (
        <div className="mx-auto">
            <ol className="flex text-[12px] tracking-normal gap-[6px] ">
                {prefixPages && prefixPages.length > 0 && (
                    <>
                        {prefixPages.map((pageNumber, index) => {
                            return (
                                <PaginatorButton
                                    key={index}
                                    pageNumber={pageNumber}
                                    active={false}
                                    setPage={setPage}
                                />
                            );
                        })}
                        {prefixPages.length > 1 && currentPage > 5 && (
                            <li className="m-auto text-[#383838]">...</li>
                        )}
                    </>
                )}
                {availablePageNumbers.map((pageNumber, index) => {
                    return (
                        <PaginatorButton
                            key={index}
                            pageNumber={pageNumber}
                            active={currentPage === pageNumber}
                            setPage={setPage}
                        />
                    );
                })}

                {suffixPages && suffixPages.length > 0 && (
                    <>
                        {suffixPages.length > 1 &&
                            suffixPages[0] - currentPage > 3 && (
                                <li className="m-auto text-[#383838]">...</li>
                            )}
                        {suffixPages.map((pageNumber, index) => {
                            return (
                                <PaginatorButton
                                    key={index}
                                    pageNumber={pageNumber}
                                    active={false}
                                    setPage={setPage}
                                />
                            );
                        })}
                    </>
                )}
                <li className="m-auto">
                    <button
                        onClick={() => setPage(currentPage + 1)}
                        className="hover:underline hover:text-[#E95E30] text-[#F27623] ml-[18px]"
                    >
                        Volgende pagina
                    </button>
                </li>
            </ol>
        </div>
    );
}
