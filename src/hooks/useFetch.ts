import {
    useQuery,
} from "@tanstack/react-query"

import { CharacterService } from "../services/characters"

async function fetchData<T>(
    url: string 
): Promise<T> {
    const characterService = new CharacterService(url)
    return await characterService.getAll<T>() 
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