import { NavigationHeader } from '@/components/navigation-header'
import { render, screen } from '@testing-library/react-native'
import React from 'react'

jest.mock('@expo/vector-icons', () => {
  const React = jest.requireActual('react')

  const { Text } = jest.requireActual('react-native')

  return {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    MaterialIcons: (props: any) => {
      return <Text testID="icon">{props.name}</Text>
    },
  }
})

describe('NavigationHeader', () => {
  it('renders the logo text', () => {
    render(<NavigationHeader />)
    expect(screen.getByText('Readify Plus')).toBeTruthy()
  })

  it('renders the settings icon', () => {
    render(<NavigationHeader />)
    expect(screen.getByTestId('icon').props.children).toBe('settings')
  })

  it('renders a pressable button', () => {
    render(<NavigationHeader />)
    const pressable = screen.getByTestId('settings-button') // <- aqui
    expect(pressable).toBeTruthy()
  })
})
