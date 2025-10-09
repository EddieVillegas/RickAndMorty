import { createContext, useCallback, useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import type { Response, InitialState, Character } from "../types";

type Context = InitialState<Response> & {
    handleUrl: (url: string) => void
    url: string
    selectedCharacter: Character | null
    selectCharacter: (character: Character) => void
} | null

type Props = {
    url: string
    children: React.ReactElement
}

export const context = createContext<Context>(null)

export default function RickAndMortyProvider(props: Props) {
    const [url, setUrl] = useState<string>(props.url)
    const [selectedCharacter, setSelectedCharater] = useState<Character|null>(null)
    const { data, error, isLoading } = useFetch<InitialState<Response>>(url)
    
    const handleUrl = useCallback((url: string) => setUrl(url), [])
    const selectCharacter = useCallback((character: Character) => setSelectedCharater(character), [])

    const value = useMemo(() => ({ 
        data, 
        error, 
        isLoading, 
        handleUrl, 
        url: props.url, 
        selectedCharacter,  
        selectCharacter 
    }), [
        data,
        error, 
        isLoading, 
        handleUrl, 
        props.url, 
        selectCharacter, 
        selectedCharacter
    ])

    return(
        <context.Provider value={value}>
            {props.children}
        </context.Provider>
    )
}