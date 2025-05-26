import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'

import Bookshelf from '@/app/(system)/(tabs)/bookshelf'
import * as useAuthModule from '@/hooks/useAuth'
import * as useBooksIsReadingModule from '@/hooks/useBooksIsReading'
import * as useBooksReadedModule from '@/hooks/useBooksReaded'
import * as useBooksFavoritesModule from '@/hooks/useBooksFavorites'

import { mockUser } from '../../__mocks__/dtos/mockUserDTO'
import { mockBooks } from '../../__mocks__/dtos/mockBookDTO'

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


jest.mock('expo-router', () => {
  const React = require('react')
  const { Text } = require('react-native')
  return {
    useFocusEffect: jest.fn(cb => cb()),
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    Redirect: ({ href }: any) => <Text>{`Redirecting to ${href}`}</Text>,
  }
})


describe('Bookshelf Screen', () => {
  const mockAuth = jest.fn()
  const mockGetBooksIsReading = jest.fn()
  const mockGetBooksReaded = jest.fn()
  const mockGetFavoriteBooks = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: mockUser,
      isLoading: false,
      auth: mockAuth,
      login: jest.fn(),
    })

    jest.spyOn(useBooksIsReadingModule, 'useBooksIsReading').mockReturnValue({
      booksIsReading: mockBooks,
      isLoadingBooksIsReading: false,
      getBooksIsReading: mockGetBooksIsReading,
    })

    jest.spyOn(useBooksReadedModule, 'useBooksReaded').mockReturnValue({
      booksReaded: mockBooks,
      isLoadingBooksReaded: false,
      getBooksReaded: mockGetBooksReaded,
    })

    jest.spyOn(useBooksFavoritesModule, 'useBooksFavorites').mockReturnValue({
      favoriteBooks: mockBooks,
      isLoadingFavoriteBooks: false,
      getFavoriteBooks: mockGetFavoriteBooks,
    })
  })

  it('should show loading indicator if any loading is true', () => {
    jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: mockUser,
      isLoading: true,
      auth: mockAuth,
      login: jest.fn(),
    })

    const { getByTestId } = render(<Bookshelf />)
    expect(getByTestId('loading-indicator')).toBeTruthy()
  })

  it('should redirect to login if user is null', () => {
    jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: null,
      isLoading: false,
      auth: mockAuth,
      login: jest.fn(),
    })

    const { getByText } = render(<Bookshelf />)
    expect(getByText('Redirecting to /(auth)/login')).toBeTruthy()
  })

  it('should render readed books by default', () => {
    const { getByText } = render(<Bookshelf />)

    expect(getByText('Continuar lendo')).toBeTruthy()
    expect(getByText('Livros lidos')).toBeTruthy()
  })

it('should switch to favoritos category when favoritos button pressed', () => {
  const { getByText, queryByTestId } = render(<Bookshelf />)

  // Confirma que o conteúdo de Favoritos ainda não está visível
  expect(queryByTestId('favoritos-section')).toBeNull()

  // Pressiona o botão "Favoritos"
  fireEvent.press(getByText('Favoritos'))

  // Agora a seção de Favoritos deve aparecer
  expect(queryByTestId('favoritos-section')).toBeTruthy()
})


  it('should call auth and fetch functions on focus effect', () => {
    render(<Bookshelf />)

    expect(mockAuth).toHaveBeenCalled()
    expect(mockGetBooksIsReading).toHaveBeenCalled()
    expect(mockGetBooksReaded).toHaveBeenCalled()
    expect(mockGetFavoriteBooks).toHaveBeenCalled()
  })
})
