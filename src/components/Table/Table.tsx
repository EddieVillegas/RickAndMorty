import { useState } from 'react';
import { FaStar } from "react-icons/fa";
import type{ Character } from "../../types"

type TableProps = {
    data: Character[] | undefined
    setShowDialog: (param: boolean) => void
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

const StarRating = ({ totalStars = 5 }) => {
    const [selectedStars, setSelectedStars] = useState(0)
    return (
        <div className='flex justify-center'>
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

export default function Table({ data, setShowDialog }: TableProps) {

    if(!data || !data.length) return <p>No characters</p>
 
    return (
        <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-4'>
            {data?.map(({ id, name, image }) => (
                <div key={id} className='p-2 cursor-pointer' onClick={() => setShowDialog(true)}>
                    <img
                        alt={name}
                        src={image}
                        loading='lazy'
                        className='rounded-2xl'
                    />
                    <p className='text-center text-2xl font-bold'>{name}</p>
                    <StarRating/>
                </div>
            ))}
        </div>
   )
}