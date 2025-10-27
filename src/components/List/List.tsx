import { useState } from 'react';
import { FaStar } from "react-icons/fa";
import type{ Character } from "../../types"
import useRickAndMorty from '../../hooks/useRickAndMorty';
import Card from '../Card/Card';

type TableProps = {
    data: Character[] | undefined
    setShowDialog: () => void
}

type StarProps =  { 
    selected?: boolean, 
    onSelect: () => void
}

const createArray = (length: number) => [...Array(length)]

const Star = ({ 
    onSelect,
    selected = false, 
}: StarProps) => 
    <FaStar 
        onClick={onSelect}
        color={selected ? "red" : "gray"} 
    />

export const StarRating = ({ totalStars = 5 }) => {
    const [selectedStars, setSelectedStars] = useState(0)
    return (
        <div className='flex justify-center has-[:hover]:grayscale has-[:hover]:brightness-50'>
            {createArray(totalStars)
                .map((_,i) =>
                    <Star
                        key={i}
                        selected={selectedStars > i}
                        onSelect={() => setSelectedStars(i + 1)}
                    />
            )}
        </div>
    )
}

export default function Table({ 
    data, 
    setShowDialog,
}: TableProps) {

    const { selectCharacter} = useRickAndMorty()

    const handleOnClick = (
        id: number
    ) => {
        selectCharacter(id)
        setShowDialog()
    }

    return (
        <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-4'>
            {data?.map((character) => 
                <Card key={character.id} character={character} onClick={() => handleOnClick(Number(character.id))}>
                    <StarRating/>
                </Card>
            )}
        </div>
   )
}