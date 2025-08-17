import {
    useQuery,
} from "@tanstack/react-query"

type InitialState<T> = {
    data: T | null
    isLoading: boolean,
    error: string | null,
}

export default function useFetch<T>(url: string): InitialState<T> {
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['character', url],
        queryFn: async () => {
            const response = await fetch(url)
            if(!response.ok) throw new Error("Somethign was wrong, try again")
            return response.json()
        },
    })

    return {
        data,
        isLoading,
        error: isError ? (error as Error).message : null
    }

}