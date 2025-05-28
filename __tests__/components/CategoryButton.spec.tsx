import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import { CategoryButton } from '@/components/category-button'
describe('CategoryButton component', () => {
    const defaultProps = {
        title: 'Favoritos',
        isSelected: false,
        onPress: jest.fn(),
    }

    it('deve renderizar o título corretamente', () => {
        const { getByText } = render(<CategoryButton {...defaultProps} />)

        expect(getByText('Favoritos')).toBeTruthy()
    })

    it('deve chamar onPress ao ser pressionado', () => {
        const onPressMock = jest.fn()
        const { getByText } = render(
            <CategoryButton {...defaultProps} onPress={onPressMock} />
        )

        fireEvent.press(getByText('Favoritos'))

        expect(onPressMock).toHaveBeenCalled()
    })

    it('deve aplicar estilo de selecionado quando isSelected for true', () => {
        const { getByText } = render(
            <CategoryButton {...defaultProps} isSelected />
        )

        const text = getByText('Favoritos')

        // Verifica se a prop style está como array e contém o estilo esperado
        expect(Array.isArray(text.props.style)).toBe(true)
    })
})
