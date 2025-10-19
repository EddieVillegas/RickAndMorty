import Card from './Card'
import { describe, test,expect, vi } from "vitest"
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

describe('Card Component', () => {
    const props = {
        character: {
            id: "1",
            name: "Bob",
            status: "live",
            gender: "male",
            image: "image.jpg",
            species: "",
            type: ""
        },
        onClick: vi.fn()
    }
    test("render correctly", () => {
        const { container } = render(<Card {...props}><></></Card>)
        expect(container).toBeInTheDocument()
    })
    test("name", () => {
        render(<Card {...props}><></></Card>)
        const p1 = screen.getByRole('paragraph')
        expect(p1).toBeInTheDocument()
        expect(p1.innerHTML).toContain(props.character.name)
        
    })
    test("image", () => {
        render(<Card {...props}><></></Card>)
        const image = screen.getByRole('img')
        expect(image).toBeInTheDocument()
        expect(image.getAttribute('src')).toBe(props.character.image)
        expect(image.getAttribute('alt')).toBe(props.character.name)
    })
    test.skip("click", () => {
        render(<Card {...props}><></></Card>)
        const btn = screen.queryByTestId('algo')
        expect(btn).toBeInTheDocument()
        fireEvent.click(btn)
        expect(props.onClick).toHaveBeenCalledOnce()
    })
})