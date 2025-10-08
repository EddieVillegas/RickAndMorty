export type Character = {
    id: string
    name: string
    status: string
    species: string
    type: string
    gender: string
    image: string
}

export type Characters = Character[]

export type Response = {
    info: {
        "count": string
        "pages": number
        "next": string,
        "prev": string
    },
    results: Characters
}

export type InitialState<T> = {
    data: T | null
    isLoading: boolean,
    error: string | null,
}