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
        <div className="w-1/4 mx-auto">
            <input
                className="w-full rounded-2xl p-1 text-center text-xl border border-black mb-5"
                type="text"
                name="name"
                ref={inputRef}
                onChange={onChange}
                autoComplete="off"
                placeholder="search a character"
            />
        </div>
    )
}