import { context } from "../provider/RickAndMorty.provider";
import { useContext } from "react";

export default function useRickAndMorty(){
    const data = useContext(context)
    if(!data) throw new Error("RickAndMorty provider need a context")
    return data
}