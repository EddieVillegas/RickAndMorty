import { Character } from "../../types"

type Props = {
    character: Character
    onClick: (character: Character) => void
}

export default function Card({ 
    character, 
    children, 
    onClick,
}: React.PropsWithChildren<Props>){
    return(
        <div
            key={character.id}
            onClick={() => onClick(character)}
            className='p-2 border border-neutral-50 hover:shadow-lg transition rounded-2xl max-w-xs cursor-pointer hover:scale-120 hover:grayscale-0 grayscale delay-150 duration-300 ease' 
        >
            <img
                alt={character.name}
                src={character.image}
                loading='lazy'
                className='rounded-full w-20 mx-auto'
            />
            <p className='text-center text-2xl font-bold'>{character.name}</p>
            {children}
        </div>
    )
}