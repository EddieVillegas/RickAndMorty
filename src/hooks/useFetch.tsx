import { useEffect, useState } from "react";

type InitialState<T> = {
    data: T | null
    isLoading: boolean,
    error: string | null,
}

export default function useFetch<T>(url: string): InitialState<T> {
    
    const initialState: InitialState<T> = {
        data: null,
        error: null,
        isLoading: false,
    }

    const [info, setInfo] = useState(initialState)

    const abortController = new AbortController()

    const fetchData = async (url: string) => {

        if(!url) return

        const URI = new URL(url)
        const name = URI.searchParams.get('name')

        if(!name) return

        setInfo(prevState => ({ ...prevState, isLoading: true }))
        try {
            const response = await fetch(url)
            if(!response.ok) throw new Error("Somethign was wrong, try again")
            const data = await response.json()
            setInfo(prevState => ({ ...prevState, data }))
        } catch (error: any) {
            setInfo(prevState => ({ ...prevState, error }))
        } finally {
            setInfo(prevState => ({ ...prevState, isLoading: false }))
        }
    }

    useEffect(() => {
        fetchData(url)
        return () => abortController.abort()
    }, [url])

    return info

}