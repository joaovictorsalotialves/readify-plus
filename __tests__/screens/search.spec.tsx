import React from 'react'
import { render, waitFor } from '@testing-library/react-native'

import Catalog from '@/app/(system)/(tabs)/search'
import * as useAuthModule from '@/hooks/useAuth'
import * as useSearchBooksModule from '@/hooks/useSearchBooks'

import { mockUser } from '../../__mocks__/dtos/mockUserDTO'
import { mockBooks } from '../../__mocks__/dtos/mockBookDTO'

jest.mock('expo-router', () => {
  const React = require('react')
  const { Text } = require('react-native')

  return {
    useFocusEffect: jest.fn(cb => cb()),
    Redirect: ({ href }: { href: string }) => <Text>{`Redirecting to ${href}`}</Text>,
  }
})

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
    MaterialIcons: (props: any) => <Text>{props.name}</Text>,
  }
})

describe('Catalog Screen', () => {
  const mockAuth = jest.fn()
  const mockSearchBooks = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: mockUser,
      isLoading: false,
      auth: mockAuth,
      login: jest.fn(), // ADICIONADO
    })

    jest.spyOn(useSearchBooksModule, 'useSearchBooks').mockReturnValue({
      isLoadingBooks: false,
      books: mockBooks,
      searchBooks: mockSearchBooks,
    })
  })

  it('should show loading indicator if isLoading and isLoadingBooks are true', () => {
    jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: mockUser,
      isLoading: true,
      auth: mockAuth,
      login: jest.fn(), // ADICIONADO
    })

    jest.spyOn(useSearchBooksModule, 'useSearchBooks').mockReturnValue({
      isLoadingBooks: true,
      books: [],
      searchBooks: mockSearchBooks,
    })

    const { getByTestId } = render(<Catalog />)
    expect(getByTestId('loading-indicator')).toBeTruthy()
  })

  it('should redirect to login if user is null', () => {
    jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: null,
      isLoading: false,
      auth: mockAuth,
      login: jest.fn(), // ADICIONADO
    })

    const { getByText } = render(<Catalog />)
    expect(getByText('Redirecting to /(auth)/login')).toBeTruthy()
  })

  it('should render GridBooks when books are present', async () => {
    jest.spyOn(useSearchBooksModule, 'useSearchBooks').mockReturnValue({
      isLoadingBooks: false,
      books: mockBooks,
      searchBooks: mockSearchBooks,
    })

    const { getByText } = render(<Catalog />)

    await waitFor(() => {
      expect(getByText('Livros')).toBeTruthy()
      expect(getByText(mockBooks[0].title)).toBeTruthy()
    })
  })

  it('should render empty state when no books found', async () => {
    jest.spyOn(useSearchBooksModule, 'useSearchBooks').mockReturnValue({
      isLoadingBooks: false,
      books: [],
      searchBooks: mockSearchBooks,
    })

    const { getByText } = render(<Catalog />)

    await waitFor(() => {
      expect(getByText('Nenhum livro encontrado')).toBeTruthy()
    })
  })
})
