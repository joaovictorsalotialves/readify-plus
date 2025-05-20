import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import BookDetailsScreen from '@/app/(system)/(tabs)/detailsbook'

jest.mock('@expo/vector-icons', () => {
  const React = require('react')
  const { Text } = require('react-native')
  return {
    MaterialIcons: (props: { name: string }) => <Text>{props.name}</Text>,
  }
})

const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}))

// Mock book data
const mockBook = {
  id: 'd7b20311-663f-4bca-bb17-47bc7f20ff82',
  title: 'Book 1',
  urlCover: 'http://localhost/book/cover/book-1',
  bookPath: 'http://localhost/book/book-1',
  synopsis: 'Synopsis 1',
  publisher: 'Publisher 1',
  numberPage: 342,
  language: 'Portuguese',
  ISBN: '983429874837',
  visits: 2,
  writer: 'author name',
  bookCategory: 'book category',
}

describe('BookDetailsScreen', () => {
  it('displays the main book information correctly', () => {
    const { getByText } = render(<BookDetailsScreen book={mockBook} />)

    expect(getByText(mockBook.title)).toBeTruthy()
    expect(getByText(mockBook.writer)).toBeTruthy()
    expect(getByText(mockBook.bookCategory)).toBeTruthy()
  })

  it('navigates to the reading screen when "Read Book" is pressed', () => {
    const { getByText } = render(<BookDetailsScreen book={mockBook} />)

    fireEvent.press(getByText('Read Book'))
    expect(mockNavigate).toHaveBeenCalledWith('Reader', { bookId: mockBook.id })
  })

  it('toggles favorite state when the heart icon is pressed', () => {
    const { getByTestId } = render(<BookDetailsScreen book={mockBook} />)

    const favoriteButton = getByTestId('favorite-button')
    expect(favoriteButton).toBeTruthy()

    fireEvent.press(favoriteButton)
    // You can add expectations here depending on the favorite toggle behavior
    // For example, expect a callback to be called or UI state to change
  })

  it('displays reading statistics correctly', () => {
    const { getByText } = render(<BookDetailsScreen book={mockBook} />)

    expect(getByText('Number of Reads')).toBeTruthy()
    expect(getByText(String(mockBook.visits))).toBeTruthy()
  })

  it('displays all informational data of the book', () => {
    const { getByText } = render(<BookDetailsScreen book={mockBook} />)

    expect(getByText(/Genre:/i)).toBeTruthy()
    expect(getByText(mockBook.publisher)).toBeTruthy()
    expect(getByText(mockBook.language)).toBeTruthy()
  })

  it('changes comments when clicking pagination', () => {
    const { getByText, queryByText } = render(<BookDetailsScreen book={mockBook} />)

    // Comment on page 1
    expect(getByText('A masterpiece of world literature!')).toBeTruthy()

    // Click pagination page 2
    fireEvent.press(getByText('2'))

    // Comment from page 1 should not be visible
    expect(queryByText('A masterpiece of world literature!')).toBeNull()

    // Comment from page 2 should appear
    expect(getByText('Rich narrative and unforgettable characters.')).toBeTruthy()
  })

  it('displays recommended books sections', () => {
    const { getByText } = render(<BookDetailsScreen book={mockBook} />)

    expect(getByText('Recommended for you')).toBeTruthy()
    expect(getByText('Similar Titles')).toBeTruthy()
  })
})
