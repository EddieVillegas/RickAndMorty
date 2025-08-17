import { useEffect, useState } from "react"

export default function useDebounce<T>(value: T, delay: number) {

    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const interval = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        return () => clearTimeout(interval)
    }, [value, delay])
    return debounceValue
}