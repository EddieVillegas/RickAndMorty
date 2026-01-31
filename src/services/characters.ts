export class CharacterService {

    constructor(private url: string){}

    async getAll<T>(): Promise<T> {
        const response = await fetch(this.url)
        if(!response.ok) throw new Error('Fails')
        return await response.json()
    }
}