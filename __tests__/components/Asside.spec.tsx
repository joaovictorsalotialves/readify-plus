import {
  Asside,
  AssideButton,
  ContainerAssideButtons,
} from '@/components/asside'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import { Text } from 'react-native'

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

describe('Asside component group', () => {
  it('should render Asside with children', () => {
    const { getByText } = render(
      <Asside>
        <Text>Conteúdo do Asside</Text>
      </Asside>
    )

    expect(getByText('Conteúdo do Asside')).toBeTruthy()
  })

  it('should render ContainerAssideButtons with children', () => {
    const { getByText } = render(
      <ContainerAssideButtons>
        <Text>Botão A</Text>
      </ContainerAssideButtons>
    )

    expect(getByText('Botão A')).toBeTruthy()
  })

  it('should render AssideButton and respond to press', () => {
    const onPressMock = jest.fn()

    const { getByTestId } = render(
      <AssideButton icon="menu" onPress={onPressMock} />
    )

    const button = getByTestId('asside-button')
    fireEvent.press(button)

    expect(onPressMock).toHaveBeenCalled()
  })
})
