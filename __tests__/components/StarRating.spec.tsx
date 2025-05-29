import { StarRating } from '@/components/star-rating'
import { colors } from '@/styles/colors'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

// ✅ Corrige o mock e importa Text dentro
jest.mock('@expo/vector-icons', () => {
  const React = require('react')
  const { Text } = require('react-native')
  return {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    MaterialIcons: ({ name, color, size }: any) => (
      <Text>{`${name}-${color}-${size}`}</Text>
    ),
  }
})

describe('StarRating', () => {
  it('renders 5 stars with correct filled and empty colors', () => {
    const { getAllByText } = render(<StarRating rating={3} />)

    const filledStars = getAllByText(`star-${colors.alert}-${32}`)
    const emptyStars = getAllByText(`star-${colors.gray[300]}-${32}`)

    expect(filledStars.length).toBe(3)
    expect(emptyStars.length).toBe(2)
  })

  it('renders stars as touchable when onChangeRating is provided', () => {
    const mockChange = jest.fn()
    const { getAllByRole } = render(
      <StarRating rating={2} onChangeRating={mockChange} />
    )

    const buttons = getAllByRole('button')
    expect(buttons.length).toBe(5)

    fireEvent.press(buttons[3])
    expect(mockChange).toHaveBeenCalledWith(4)
  })

  it('renders stars as non-touchable when onChangeRating is not provided', () => {
    const { queryAllByRole } = render(<StarRating rating={4} />)

    const buttons = queryAllByRole('button')
    expect(buttons.length).toBe(0)
  })
})
