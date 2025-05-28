import React from 'react'
import { render } from '@testing-library/react-native'
import { Card } from '@/components/card'

describe('Card component', () => {
    it('deve renderizar as informações corretamente', () => {
        const props = {
            info: '42 livros',
            label: 'Lidos',
        }

        const { getByText } = render(<Card {...props} />)

        expect(getByText('42 livros')).toBeTruthy()
        expect(getByText('Lidos')).toBeTruthy()
    })
})
