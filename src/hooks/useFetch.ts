import {
    useQuery,
} from "@tanstack/react-query"

async function fetchData<T>(
    url: string 
): Promise<T> {
    const response = await fetch(url)
    if(!response.ok) throw new Error("Somethign was wrong, try again")
    const data = response.json()
    return data
}

export default function useFetch<T>(
    url: string
): T {
    const query = useQuery({
        queryKey: ['character', url],
        queryFn: () => fetchData(url),
    })

    return query as T

}