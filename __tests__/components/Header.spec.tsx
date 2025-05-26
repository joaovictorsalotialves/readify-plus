import { Header } from '@/components/header'
import { fireEvent, render } from '@testing-library/react-native'
import { router } from 'expo-router'
import React from 'react'

// Mock do router
jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
  },
}))

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

describe('Header', () => {
  const mockRoute = '/login'

  it('should render the back button and logo text', () => {
    const { getByText, getByTestId } = render(<Header backRoute={mockRoute} />)

    expect(getByText('Readify Plus')).toBeTruthy()
    expect(getByTestId('back-button')).toBeTruthy()
  })

  it('should navigate to the backRoute when pressed', () => {
    const { getByTestId } = render(<Header backRoute={mockRoute} />)

    const button = getByTestId('back-button')
    fireEvent.press(button)

    expect(router.navigate).toHaveBeenCalledWith(mockRoute)
  })
})
