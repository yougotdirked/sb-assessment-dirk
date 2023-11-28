export interface IPaginatorProps {
    currentPage: number
    lastPage?: number
    setPage: (newPage: number) => void
}

export default function Paginator({
    currentPage,
    lastPage,
    setPage,
}: IPaginatorProps) {
    return (
        <div className="mx-auto">
            <ol>
                <li>
                    <button
                        onClick={() => setPage(currentPage + 1)}
                        className="hover:underline hover:text-[#E95E30] text-[#F27623]"
                    >
                        Volgende pagina
                    </button>
                </li>
            </ol>
        </div>
    )
}
