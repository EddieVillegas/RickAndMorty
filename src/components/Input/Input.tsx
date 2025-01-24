import { useRef, useEffect } from "react"

type Props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ onChange }: Props){
    
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    return (
        <input 
            type="text"
            name="name"
            ref={inputRef}
            onChange={onChange}
            autoComplete="false"
            placeholder="search a character"
        />
    )
}