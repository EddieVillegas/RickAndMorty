import { useContext } from "react";

import { Context } from "../provider/Theme.provider";

export default function useTheme(){
    const context = useContext(Context)
    if(!context) throw new Error('context is need it in Theme Provider')
    return context
}