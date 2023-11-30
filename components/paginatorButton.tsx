export interface IPaginatorButtonProps {
    pageNumber: number;
    active: boolean;
    setPage: (newPage: number) => void;
}

export default function PaginatorButton({
    pageNumber,
    active,
    setPage,
}: IPaginatorButtonProps) {
    return (
        <li
            className={`m-auto text-[#383838] ${
                active
                    ? "font-bold py-[4px] px-[12px] py-0 rounded-[13px] text-[14px] bg-[#E7E7E7]"
                    : "text-[12px]"
            }`}
            onClick={() => setPage(pageNumber)}
        >
            <button className={`${!active ? "px-[6px] py-[3px]" : ""}`}>
                {pageNumber}
            </button>
        </li>
    );
}
