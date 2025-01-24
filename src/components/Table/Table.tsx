import { useState } from 'react';
import { FaStar } from "react-icons/fa";
import type{ Character } from "../../types"

type TableProps = {
    data: Character[] | undefined
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
    return createArray(totalStars)
        .map((_,i) => 
            <Star
                key={i}
                selected={selectedStars > i}
                onSelect={() => setSelectedStars(i + 1)}
            />) 
}

export default function Table({ data }: TableProps) {

    if(!data || !data.length) return <p>No characters</p>
 
    return (
        <table>

            <thead>
                <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Power</th>
                </tr>
            </thead>

            <tbody>
                {data?.map(({ id, name, image }) =>
                    <tr key={id}>
                        <td>{name}</td>
                        <td>
                            <img src={image} alt={name} width="50" loading='lazy'/>
                        </td>
                        <td>
                            <StarRating/>
                        </td>
                    </tr>
                )}
            </tbody>

        </table>
    )
    
}