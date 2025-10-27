import { debounce } from "lodash";
import useFetch from "../hooks/useFetch";
import type { Response, InitialState, Character } from "../types";
import { createContext, PropsWithChildren, useCallback, useMemo, useState, useRef, RefObject} from "react";

type Context = InitialState<Response> & {
    openDialog: () => void
    closeDialog: () => void
    selectedCharacter: Character | null
    onChangePage: (page: string) => void
    handleOnChange: (url: string) => void
    selectCharacter: (id: number) => void
    dialogRef: RefObject<HTMLDialogElement | null>
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
    const handleUrl = useCallback((newUrl: string) => setUrl(newUrl), [])
    const selectCharacter = useCallback((id: number) => setSelectedCharaterId(id), [])
    const selectedCharacter = useMemo(() => data?.results.find(c => Number(c.id) === selectedCharacterId) ?? null, [selectedCharacterId])
    
    //handle functions
    const debounceOnChange = debounce(handleUrl, 1000)
    const closeDialog = () => dialogRef.current && dialogRef.current.close()
    const openDialog = () => dialogRef.current && dialogRef.current.showModal()
    
    const value = useMemo(() => ({ 
        data, 
        error,
        dialogRef,
        isLoading,
        openDialog,
        closeDialog,
        selectedCharacter,
        selectCharacter,
        handleOnChange: debounceOnChange,
        onChangePage,
    }), [
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
    ])

    return(
        <Context value={value}>
            {props.children}
        </Context>
    )
}