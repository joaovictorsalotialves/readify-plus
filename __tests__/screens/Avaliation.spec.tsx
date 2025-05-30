import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { useRouter } from 'expo-router'
import React, { act } from 'react'
import { Alert } from 'react-native'

import Avaliation from '@/app/(system)/(reading)/avaliation/[bookId]'
import * as useAuthModule from '@/hooks/useAuth'
import * as useBookModule from '@/hooks/useBook'
import * as useCreateBookReviewModule from '@/hooks/useCreateBookReview'
import { mockBook } from '../../__mocks__/dtos/mockBookDTO'
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
      back: jest.fn(),
    }),
    useFocusEffect: jest.fn(cb => cb()),
    useLocalSearchParams: () => ({ bookId: 'book-123' }),
    Redirect: ({ href }: { href: string }) => <Text>Redirect to {href}</Text>,
  }
})

jest.mock('@/components/resource-header', () => {
  const React = require('react')
  const { Text } = require('react-native')
  return {
    ResourceHeader: ({ title }: { title: string }) => <Text>{title}</Text>,
  }
})

jest.mock('@/components/star-rating', () => {
  const React = require('react')
  const { Text, Pressable } = require('react-native')
  return {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    StarRating: ({ onChangeRating }: any) => {
      const React = require('react')
      const { Pressable, Text, View } = require('react-native')
      return (
        <View style={{ flexDirection: 'row' }}>
          {[1, 2, 3, 4, 5].map(i => (
            <Pressable
              key={i}
              testID={`star-button-${i}`}
              accessibilityRole="button"
              onPress={() => onChangeRating(i)}
            >
              <Text>{`★ ${i}`}</Text>
            </Pressable>
          ))}
        </View>
      )
    },
  }
})

jest.mock('@/components/loading', () => {
  const React = require('react')
  const { Text } = require('react-native')
  return {
    Loading: () => <Text>Loading...</Text>,
  }
})

describe('Book Review Screen', () => {
  const mockBack = useRouter().back

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('redirects if no user is logged in', () => {
    jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: null,
      isLoading: false, // <-- aqui é o ponto importante
      auth: jest.fn(),
      login: jest.fn(),
    })
    jest.spyOn(useBookModule, 'useBook').mockReturnValue({
      book: mockBook,
      getBook: jest.fn(),
      isLoadingBook: false, // sem loading
      isFavorite: false,
      removeBookReview: jest.fn(),
      toggleFavorite: jest.fn(),
    })
    jest
      .spyOn(useCreateBookReviewModule, 'useCreateBookReview')
      .mockReturnValue({
        createBookReview: jest.fn(),
        isLoadingCreateBookReview: false,
      })

    const { getByText } = render(<Avaliation />)
    expect(getByText('Redirect to /(auth)/login')).toBeTruthy()
  })

  it('shows loading when loading data', () => {
    jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: mockUser,
      isLoading: true,
      auth: jest.fn(),
      login: jest.fn(),
    })
    jest.spyOn(useBookModule, 'useBook').mockReturnValue({
      book: mockBook,
      getBook: jest.fn(),
      isLoadingBook: true,
      isFavorite: false,
      removeBookReview: jest.fn(),
      toggleFavorite: jest.fn(),
    })
    jest
      .spyOn(useCreateBookReviewModule, 'useCreateBookReview')
      .mockReturnValue({
        createBookReview: jest.fn(),
        isLoadingCreateBookReview: true,
      })

    const { getByText } = render(<Avaliation />)
    expect(getByText('Loading...')).toBeTruthy()
  })

  it.skip('renders inputs and submits review', async () => {
    const mockCreateBookReview = jest.fn().mockResolvedValue({})
    jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: mockUser,
      isLoading: false,
      auth: jest.fn(),
      login: jest.fn(),
    })
    jest.spyOn(useBookModule, 'useBook').mockReturnValue({
      book: mockBook,
      getBook: jest.fn(),
      isLoadingBook: false,
      isFavorite: false,
      removeBookReview: jest.fn(),
      toggleFavorite: jest.fn(),
    })
    jest
      .spyOn(useCreateBookReviewModule, 'useCreateBookReview')
      .mockReturnValue({
        createBookReview: mockCreateBookReview,
        isLoadingCreateBookReview: false,
      })

    const { getByText, getByPlaceholderText, getByTestId } = render(
      <Avaliation />
    )

    fireEvent.changeText(getByPlaceholderText('Comentário...'), 'Great read!')
    fireEvent.press(getByTestId('star-button-4'))

    fireEvent.press(getByText('Enviar Comentário'))

    expect(getByText('Avaliação: O Senhor dos Anéis')).toBeTruthy()

    await waitFor(() => {
      expect(mockCreateBookReview).toHaveBeenCalled()
      expect(mockBack).toHaveBeenCalled()
    })
  })

  it('shows alert on submit error', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert')
    const mockCreateBookReview = jest.fn().mockRejectedValue(new Error('fail'))

    jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: mockUser,
      isLoading: false,
      auth: jest.fn(),
      login: jest.fn(),
    })
    jest.spyOn(useBookModule, 'useBook').mockReturnValue({
      book: mockBook,
      getBook: jest.fn(),
      isLoadingBook: false,
      isFavorite: false,
      removeBookReview: jest.fn(),
      toggleFavorite: jest.fn(),
    })
    jest
      .spyOn(useCreateBookReviewModule, 'useCreateBookReview')
      .mockReturnValue({
        createBookReview: mockCreateBookReview,
        isLoadingCreateBookReview: false,
      })

    const { getByText, getByTestId } = render(<Avaliation />)

    const star = getByTestId('star-button-3')
    fireEvent.press(star)

    fireEvent.press(getByText('Enviar Comentário'))

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Erro ao enviar a avaliação')
    })
  })
})
