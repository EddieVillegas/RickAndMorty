import { createContext, useState, type PropsWithChildren} from "react";

type Theme = "ligth" | "dark"

type ContextType = {
    theme: Theme
    toggleTheme: () => void
} | null

export const Context = createContext<ContextType>(null)

export default function ThemeProvicer({ children }: PropsWithChildren) {
    
    const [theme, setTheme] = useState<Theme>("ligth")

    const toggleTheme = () => setTheme(prevTheme => prevTheme === "ligth" ? "dark" : "ligth")

    const initialState: ContextType = {
        theme,
        toggleTheme
    }

    return(
        <Context value={initialState}>
            {children}
        </Context>
    )
}