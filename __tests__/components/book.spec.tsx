import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Book } from '@/components/book'
import { router } from 'expo-router'

// mock do router
jest.mock('expo-router', () => ({
    router: {
        navigate: jest.fn(),
    },
}))

describe('Book component', () => {
    const mockBook = {
        id: '123',
        title: 'O Senhor dos Anéis',
        urlCover: 'senhor-dos-aneis.jpg',
    }

    it('deve renderizar o título e a imagem do livro corretamente', () => {
        const { getByText, getByTestId } = render(<Book {...mockBook} />)

        expect(getByText(mockBook.title)).toBeTruthy()

        const image = getByTestId('book-cover')
        expect(image.props.src || image.props.source.uri).toContain(`/covers/${mockBook.urlCover}`)
    })

    it('deve navegar para os detalhes do livro ao pressionar', () => {
        const { getByTestId } = render(<Book {...mockBook} />)

        const pressable = getByTestId('book-pressable')
        fireEvent.press(pressable)

        expect(router.navigate).toHaveBeenCalledWith(`/(system)/(tabs)/detailsbook/${mockBook.id}`)
    })
})
