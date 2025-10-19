import { Character } from "../../types"

type Props = {
    character: Character
    children: React.ReactElement
    onClick: (character: Character) => void
}

export default function Card({ 
    character, 
    children, 
    onClick,
}: Props){
    return(
        <div
            data-testid='algo'
            key={character.id}
            className='p-2 border border-neutral-50 hover:shadow-lg transition-shadow rounded-2xl max-w-xs cursor-pointer' 
            onClick={() => onClick(character)}
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