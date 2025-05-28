import React from 'react'
import { render } from '@testing-library/react-native'
import { FeaturedBooks } from '@/components/featured-books' // ajuste conforme necessário
import { mockBooks } from '../../__mocks__/dtos/mockBookDTO'

jest.mock('@/components/book', () => {
    const React = require('react')
    const { Text } = require('react-native')

    return {
        Book: ({ title }: { title: string }) => React.createElement(Text, null, title),
    }
})


describe('FeaturedBooks component', () => {


    it('deve renderizar o título corretamente', () => {
        const { getByText } = render(
            <FeaturedBooks title="Destaques" data={mockBooks} />
        )

        expect(getByText('Destaques')).toBeTruthy()
    })

    it('deve renderizar a lista de livros', () => {
        const { getByText } = render(
            <FeaturedBooks title="Destaques" data={mockBooks} />
        )

        expect(getByText(mockBooks[0].title)).toBeTruthy()
        expect(getByText(mockBooks[1].title)).toBeTruthy()
    })

    it('não deve renderizar nada quando a lista estiver vazia', () => {
        const { queryByText } = render(
            <FeaturedBooks title="Destaques" data={[]} />
        )

        expect(queryByText('Destaques')).toBeNull()
    })
})
