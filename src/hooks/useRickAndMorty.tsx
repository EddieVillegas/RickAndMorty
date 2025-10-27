import { Context } from "../provider/RickAndMorty.provider";
import { useContext } from "react";

export default function useRickAndMorty(){
    const data = useContext(Context)
    if(!data) throw new Error("RickAndMorty provider need a context")
    return data
}