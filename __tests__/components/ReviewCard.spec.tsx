import { ReviewCard } from '@/components/review-card'
import { useAuth } from '@/hooks/useAuth'
import { useBook } from '@/hooks/useBook'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { mockReview } from '../../__mocks__/dtos/mockReviewDTO'

jest.mock('@/hooks/useAuth')
jest.mock('@/hooks/useBook')

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}))

jest.mock('@expo/vector-icons', () => {
  const React = require('react')
  const { Text } = require('react-native')

  return {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    MaterialIcons: (props: any) => <Text {...props}>{props.name}</Text>,
  }
})

jest.mock('@/components/star-rating', () => ({
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  StarRating: function MockStarRating(props: any) {
    return {
      $$typeof: Symbol.for('react.element'),
      type: 'Text',
      key: null,
      ref: null,
      props: { children: `Rating: ${props.rating}` },
      _owner: null,
    }
  },
}))

const mockRemoveBookReview = jest.fn()

describe('ReviewCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders review information correctly', () => {
    ;(useAuth as jest.Mock).mockReturnValue({ user: { id: 'user-456' } })
    ;(useBook as jest.Mock).mockReturnValue({
      removeBookReview: mockRemoveBookReview,
    })

    const { getByText, queryByTestId } = render(
      <ReviewCard review={mockReview} />
    )

    expect(getByText('João')).toBeTruthy()
    expect(getByText('Gostei bastante da narrativa.')).toBeTruthy()
    expect(getByText('Rating: 4')).toBeTruthy()

    // Should not show delete icon (different user)
    expect(queryByTestId('delete-button')).toBeNull()
  })

  it('shows delete button when the user is the review author', () => {
    ;(useAuth as jest.Mock).mockReturnValue({ user: { id: 'user-123' } })
    ;(useBook as jest.Mock).mockReturnValue({
      removeBookReview: mockRemoveBookReview,
    })

    const { getByTestId } = render(<ReviewCard review={mockReview} />)

    expect(getByTestId('delete-button')).toBeTruthy()
  })

  it('calls removeBookReview when delete button is pressed', () => {
    ;(useAuth as jest.Mock).mockReturnValue({ user: { id: 'user-123' } })
    ;(useBook as jest.Mock).mockReturnValue({
      removeBookReview: mockRemoveBookReview,
    })

    const { getByTestId } = render(<ReviewCard review={mockReview} />)

    const deleteButton = getByTestId('delete-button')
    fireEvent.press(deleteButton)

    expect(mockRemoveBookReview).toHaveBeenCalledWith('review-1', 'user-123')
  })
})
