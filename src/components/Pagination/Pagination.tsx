type Props = {
    nextPage: string | undefined
    prevPage: string | undefined
    onChangePrevPage: () => void
    onChangeNextPage: () => void
}

export default function Pagination({ 
    nextPage, 
    prevPage, 
    onChangeNextPage, 
    onChangePrevPage
}: Props) {

    const existPrevPage = !!prevPage
    const existNextPage = !!nextPage

    return (
        <ul className="flex gap-5 mx-auto w-50">
            <li>
                <button 
                    disabled={!existPrevPage} 
                    onClick={onChangePrevPage} 
                    className="disabled:opacity-75 disabled:cursor-not-allowed p-2 rounded-full text-white bg-black cursor-pointer w-10 h-10"
                    title="previous page"
                    >
                    &lt;
                </button>
            </li>
            <li>
                <button
                    title="next page"
                    disabled={!existNextPage} 
                    onClick={onChangeNextPage} 
                    className="disabled:opacity-75 disabled:cursor-not-allowed p-2 rounded-full text-white bg-black cursor-pointer w-10 h-10"
                >
                    &gt;
                </button>
            </li>
        </ul>
    )
}