import { debounce } from "lodash";
import useFetch from "../hooks/useFetch";
import type { Response, InitialState, Characters, Character } from "../types";
import { createContext, PropsWithChildren, useCallback, useMemo, useState, useRef, RefObject} from "react";

type Context = {
    error: string | null,
    isLoading: boolean,
    characters: Characters | undefined,
    openDialog: () => void
    closeDialog: () => void
    selectedCharacter: Character | null
    onChangePage: (page: string | undefined) => void
    handleOnChange: (url: string | undefined) => void
    selectCharacter: (id: number) => void
    dialogRef: RefObject<HTMLDialogElement | null>
    nextPage: string | undefined
    prevPage: string | undefined
} | null

type Props = {
    url: string
}

export const Context = createContext<Context>(null)

export default function RickAndMortyProvider(
    props: PropsWithChildren<Props>
) {
    
    //custom hooks
    const [selectedCharacterId, setSelectedCharaterId] = useState<number|null>(null)

    //state
    const [url, setUrl] = useState<string>(props.url)
    const dialogRef = useRef<HTMLDialogElement|null>(null)
    const { data, error, isLoading } = useFetch<InitialState<Response>>(url)
    
    //optimization
    const onChangePage = useCallback((next: string) => handleUrl(next), [])
    const handleUrl = useCallback((newUrl: string) => setUrl(url + newUrl), [])
    const selectCharacter = useCallback((id: number) => setSelectedCharaterId(id), [])
    const selectedCharacter = useMemo(() => data?.results.find(c => Number(c.id) === selectedCharacterId) ?? null, [selectedCharacterId])
    
    //handle functions
    const debounceOnChange = debounce(handleUrl, 1000)
    const closeDialog = () => dialogRef.current && dialogRef.current.close()
    const openDialog = () => dialogRef.current && dialogRef.current.showModal()
    
    const nextPage = useMemo(() => {
        const url = data?.info.next ? new URL(data?.info.next) : ""
        return url.search
    }, [data])
    const prevPage = useMemo(() => {
        const url = data?.info.prev ? new URL(data?.info.prev) : ""
        return url.search
    }, [data])
    const characters = useMemo(() => data?.results, [data])

    const value = useMemo(() => ({ 
        characters,
        error,
        dialogRef,
        isLoading,
        openDialog,
        closeDialog,
        selectedCharacter,
        selectCharacter,
        handleOnChange: debounceOnChange,
        onChangePage,
        nextPage,
        prevPage
    }), [
        nextPage,
        prevPage,
        data,
        error,
        dialogRef,
        isLoading,
        openDialog,
        closeDialog,
        onChangePage,
        selectCharacter, 
        selectedCharacter,
        debounceOnChange,
        characters
    ])

    return(
        <Context value={value}>
            {props.children}
        </Context>
    )
}