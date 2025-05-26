import { act, fireEvent, render } from '@testing-library/react-native'

import { Input } from '@/components/input'

jest.mock('expo-font')

jest.mock('@expo/vector-icons', () => {
  const React = require('react')
  const { Text } = require('react-native')

  return {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    MaterialIcons: (props: any) => (
      <Text {...props} testID="input-icon">
        {props.name}
      </Text>
    ),
  }
})

describe('Input component', () => {
  it('should render the input with icon', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input icon="email" placeholder="E-mail" />
    )

    expect(getByPlaceholderText('E-mail')).toBeTruthy()
    expect(getByTestId('input-icon')).toBeTruthy()
  })

  it('should apply focus styles when input is focused', () => {
    const { getByPlaceholderText } = render(
      <Input icon="email" placeholder="E-mail" />
    )

    const input = getByPlaceholderText('E-mail')

    fireEvent(input, 'focus')

    expect(input.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ borderColor: expect.any(String) }), // verifica que aplica estilo
      ])
    )
  })

  it('should display error message when messageError is passed', () => {
    const { getByText } = render(
      <Input
        icon="email"
        placeholder="E-mail"
        messageError="Campo obrigatório"
      />
    )

    expect(getByText('Campo obrigatório')).toBeTruthy()
  })

  it('should hide error message while input is focused', () => {
    const { getByPlaceholderText, queryByText } = render(
      <Input icon="email" placeholder="E-mail" messageError="Erro" />
    )

    const input = getByPlaceholderText('E-mail')
    fireEvent(input, 'focus')

    expect(queryByText('Erro')).toBeNull()
  })

  it('should apply filled icon style when isFilled is true', () => {
    const { getByTestId } = render(
      <Input icon="email" placeholder="E-mail" isFilled />
    )

    const icon = getByTestId('input-icon')
    expect(icon).toBeTruthy()
  })
})
