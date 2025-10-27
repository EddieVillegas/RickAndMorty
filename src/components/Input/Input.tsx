import { useRef, useEffect } from "react"

type Props = {
    onChange: (key: string) => void
}

export default function Input({ onChange }: Props){
    
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(`${e.target.name}=${e.target.value}`)
    }

    return (
        <div className="w-1/4 mx-auto">
            <input
                className="w-full rounded-2xl p-1 text-center text-xl border border-black mb-5"
                type="text"
                name="name"
                ref={inputRef}
                onChange={handleOnChange}
                autoComplete="off"
                placeholder="search a character"
            />
        </div>
    )
}