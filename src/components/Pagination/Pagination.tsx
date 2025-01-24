import styles from "./Pagination.module.css"

type Props = {
    nextPage: string | undefined
    prevPage: string | undefined
    onChangePrevPage: () => void
    onChangeNextPage: () => void
}

export default function Pagination({ nextPage, prevPage, onChangeNextPage, onChangePrevPage}: Props) {
    return (
        <>
            <ul className={styles.list}>
                {prevPage && <li>
                    <a href="#" onClick={onChangePrevPage}>Prev</a>
                </li>}
                {nextPage && <li>
                    <a href="#" onClick={onChangeNextPage}>Next</a>
                </li>}
            </ul>
        </>
    )
}