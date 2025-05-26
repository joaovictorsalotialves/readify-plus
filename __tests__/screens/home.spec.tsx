import { render, waitFor } from '@testing-library/react-native'
import React from 'react'
import { Text } from 'react-native'

import Home from '@/app/(system)/(tabs)/home'
import { AuthContext } from '@/contexts/AuthContext'

import * as useAuthModule from '@/hooks/useAuth'
import * as useBooksIsReadingModule from '@/hooks/useBooksIsReading'
import * as useCountBookReviewModule from '@/hooks/useCountBookReview'
import * as useCountBooksReadModule from '@/hooks/useCountBooksRead'
import * as useMostPopularBooksModule from '@/hooks/useMostPopularBooks'
import * as useRecommendBooksModule from '@/hooks/useRecommendBooks'
import { mockBooks } from '../../__mocks__/dtos/mockBookDTO'
import { mockUser } from '../../__mocks__/dtos/mockUserDTO'

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}))

jest.mock('expo-router', () => {
  const React = require('react')
  const { Text } = require('react-native')

  return {
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
    }),
    useFocusEffect: jest.fn(cb => cb()),
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    Redirect: ({ href }: any) => <Text>{`Redirecting to ${href}`}</Text>,
  }
})

jest.mock('@expo/vector-icons', () => {
  const React = require('react')
  const { Text } = require('react-native')

  return {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    MaterialIcons: (props: any) => <Text>{props.name}</Text>,
  }
})

const mockAuth = jest.fn()

const renderWithContext = (overrideValues = {}) => {
  return render(
    <AuthContext.Provider
      value={{
        user: mockUser,
        auth: mockAuth,
        login: jest.fn(),
        isLoading: false,
      }}
    >
      <Home />
    </AuthContext.Provider>
  )
}

describe('Home Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      isLoading: false,
      user: mockUser,
      auth: mockAuth,
      login: jest.fn(),
    })

    jest.spyOn(useBooksIsReadingModule, 'useBooksIsReading').mockReturnValue({
      isLoadingBooksIsReading: false,
      booksIsReading: mockBooks,
      getBooksIsReading: jest.fn(),
    })

    jest.spyOn(useRecommendBooksModule, 'useRecommendBooks').mockReturnValue({
      isLoadingRecommendBooks: false,
      recommendBooks: mockBooks,
      getRecommendBooks: jest.fn(),
    })

    jest
      .spyOn(useMostPopularBooksModule, 'useMostPopularBooks')
      .mockReturnValue({
        isLoadingMostPopularBooks: false,
        mostPopularBooks: mockBooks,
        getMostPopularBooks: jest.fn(),
      })

    jest.spyOn(useCountBooksReadModule, 'useCountBooksRead').mockReturnValue({
      isLoadingCountBooksRead: false,
      countBooksRead: 7,
      getCountBooksRead: jest.fn(),
    })

    jest.spyOn(useCountBookReviewModule, 'useCountBookReview').mockReturnValue({
      isLoadingCountBookReview: false,
      countBookReview: 4,
      getCountBookReview: jest.fn(),
    })
  })

  it('should show loading indicator if any data is still loading', () => {
    jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      isLoading: true,
      auth: mockAuth,
      user: mockUser,
      login: jest.fn(),
    })

    const { getByTestId } = renderWithContext()
    expect(getByTestId('loading-indicator')).toBeTruthy()
  })

  it('should redirect to login if user is null', () => {
    jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      isLoading: false,
      user: null,
      auth: mockAuth,
      login: jest.fn(),
    })

    const { getByText } = renderWithContext({ user: null })
    expect(getByText('Redirecting to /(auth)/login')).toBeTruthy()
  })

  it('should render cards and featured books', async () => {
    const { getByText } = renderWithContext()

    await waitFor(() => {
      expect(getByText('Quantidade de livros lidas')).toBeTruthy()
      expect(getByText('7')).toBeTruthy()

      expect(getByText('Quantidade de comentários')).toBeTruthy()
      expect(getByText('4')).toBeTruthy()

      expect(getByText('Continuar lendo')).toBeTruthy()
      expect(getByText('Sugestões de leitura')).toBeTruthy()
      expect(getByText('Livros mais populares')).toBeTruthy()
    })
  })
})
