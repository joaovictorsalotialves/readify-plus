import { Button } from '@/components/button'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

describe('Button component', () => {
  it('should render the button with the correct text', () => {
    const { getByText } = render(<Button text="Confirmar" />)

    expect(getByText('Confirmar')).toBeTruthy()
  })

  it('should call onPress when pressed', () => {
    const onPressMock = jest.fn()

    const { getByText } = render(
      <Button text="Clique aqui" onPress={onPressMock} />
    )

    fireEvent.press(getByText('Clique aqui'))

    expect(onPressMock).toHaveBeenCalled()
  })

  it('should render the loading indicator when isLoading is true', () => {
    const { getByTestId, queryByText } = render(
      <Button text="Carregar" isLoading />
    )

    expect(getByTestId('loading-indicator')).toBeTruthy()
    expect(queryByText('Carregar')).toBeNull()
  })

  it('should apply confirm style by default', () => {
    const { getByText } = render(<Button text="Confirmar" />)

    const buttonText = getByText('Confirmar')

    expect(buttonText).toBeTruthy()
  })

  it('should apply redirect style when type is redirect', () => {
    const { getByText } = render(<Button text="Redirecionar" type="redirect" />)

    const buttonText = getByText('Redirecionar')

    expect(buttonText).toBeTruthy()
  })

  it('should apply cancel style when type is cancel', () => {
    const { getByText } = render(<Button text="Cancelar" type="cancel" />)

    const buttonText = getByText('Cancelar')

    expect(buttonText).toBeTruthy()
  })

  it('should be disabled when isLoading is true', () => {
    const { getByRole } = render(<Button text="Desabilitado" isLoading />)
    const button = getByRole('button')

    expect(button.props.accessibilityState.disabled).toBe(true)
  })

  it('should be disabled when disabled prop is true', () => {
    const { getByRole } = render(
      <Button text="Inativo" disabled onPress={jest.fn()} />
    )

    const button = getByRole('button')

    expect(button.props.accessibilityState.disabled).toBe(true)
  })
})
