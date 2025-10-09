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
                <button disabled={!existPrevPage} onClick={onChangePrevPage} className="disabled:opacity-75 disabled:cursor-not-allowed p-2 rounded-2xl text-black bg-amber-50 cursor-pointer">&lt;Previous</button>
            </li>
            <li>
                <button disabled={!existNextPage} onClick={onChangeNextPage} className="disabled:opacity-75 disabled:cursor-not-allowed p-2 rounded-2xl text-black bg-amber-50 cursor-pointer">Next &gt;</button>
            </li>
        </ul>
    )
}