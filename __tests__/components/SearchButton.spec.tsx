import { SearchButton } from '@/components/search-button'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

// Mock for MaterialIcons
jest.mock('@expo/vector-icons', () => {
  const React = require('react')
  const { Text } = require('react-native')

  return {
    MaterialIcons: ({ name }: { name: string }) => <Text>{name}</Text>,
  }
})

describe('SearchButton', () => {
  it('renders the search input and filter button', () => {
    const { getByTestId, getByText } = render(<SearchButton />)

    expect(getByTestId('search-input')).toBeTruthy()
    expect(getByText('filter-list')).toBeTruthy()
  })

  it('calls onChangeText when text is typed', () => {
    const handleChangeText = jest.fn()
    const { getByTestId } = render(
      <SearchButton onChangeText={handleChangeText} />
    )

    const input = getByTestId('search-input')
    fireEvent.changeText(input, 'react')

    expect(handleChangeText).toHaveBeenCalledWith('react')
  })
})
