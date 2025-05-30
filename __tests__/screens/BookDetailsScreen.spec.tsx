jest.mock('expo-router', () => {
  return {
    useLocalSearchParams: jest.fn(() => ({ id: '1' })),
    router: {
      back: jest.fn(),
      navigate: jest.fn(),
    },
    useLoadedNavigation: () => ({
      current: {
        navigate: jest.fn(),
        goBack: jest.fn(),
      },
    }),
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    useFocusEffect: (callback: any) => {
      // Executa o callback imediatamente para testes, simulando o efeito focado
      // useCallback está dentro do callback, então invoca assim:
      if (typeof callback === 'function') {
        callback()
      } else if (typeof callback?.callback === 'function') {
        callback.callback()
      }
    },
  }
})

import BookDetailsScreen from '@/app/(system)/(tabs)/detailsbook/[id]'
import { useAuth } from '@/hooks/useAuth'
import { useBook } from '@/hooks/useBook'
import { useGetBookReviewsOfBook } from '@/hooks/useGetBookReviewsOfBook'
import { useRecommendBooks } from '@/hooks/useRecommendBooks'
import { useSimilarBooks } from '@/hooks/useSimilarBooks'
import { NavigationContainer } from '@react-navigation/native'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { mockBook } from '../../__mocks__/dtos/mockBookDTO'
import { mockReviews } from '../../__mocks__/dtos/mockReviewDTO'

import * as ExpoRouter from 'expo-router'

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}))

jest.mock('@/hooks/useAuth')
jest.mock('@/hooks/useBook')
jest.mock('@/hooks/useRecommendBooks')
jest.mock('@/hooks/useSimilarBooks')
jest.mock('@/hooks/useGetBookReviewsOfBook')

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native')

  return {
    ...actual,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
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

const renderWithNavigation = (ui: React.ReactElement) => {
  return render(<NavigationContainer>{ui}</NavigationContainer>)
}

describe('BookDetailsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(ExpoRouter.useLocalSearchParams as jest.Mock).mockReturnValue({ id: '1' })
    ;(useAuth as jest.Mock).mockReturnValue({
      isLoading: false,
      auth: jest.fn(),
    })
    ;(useBook as jest.Mock).mockReturnValue({
      isLoadingBook: false,
      book: mockBook,
      isFavorite: false,
      getBook: jest.fn(),
      toggleFavorite: jest.fn(),
      removeBookReview: jest.fn(),
    })
    ;(useRecommendBooks as jest.Mock).mockReturnValue({
      isLoadingRecommendBooks: false,
      recommendBooks: [],
      getRecommendBooks: jest.fn(),
    })
    ;(useSimilarBooks as jest.Mock).mockReturnValue({
      isLoadingSimilarBooks: false,
      similarBooks: [],
      getSimilarBooks: jest.fn(),
    })
    ;(useGetBookReviewsOfBook as jest.Mock).mockReturnValue({
      assessements: mockReviews,
      getBookReviewsOfBook: jest.fn(),
    })
  })

  it('exibe carregamento se estiver carregando', () => {
    ;(useAuth as jest.Mock).mockReturnValue({
      isLoading: true,
      auth: jest.fn(),
    })

    const { getByTestId } = renderWithNavigation(<BookDetailsScreen />)
    expect(getByTestId('loading-indicator')).toBeTruthy()
  })

  it('exibe mensagem se livro não for encontrado', () => {
    ;(useBook as jest.Mock).mockReturnValue({
      isLoadingBook: false,
      book: null,
      isFavorite: false,
      getBook: jest.fn(),
      toggleFavorite: jest.fn(),
      removeBookReview: jest.fn(),
    })

    const { getByText } = renderWithNavigation(<BookDetailsScreen />)
    expect(getByText('Livro não encontrado.')).toBeTruthy()
  })

  it('renderiza os dados do livro corretamente', () => {
    const { getByText, getAllByText } = renderWithNavigation(
      <BookDetailsScreen />
    )

    expect(getAllByText(mockBook.title)).toBeTruthy()
    expect(getByText(mockBook.writer.name)).toBeTruthy()
    expect(getByText(mockBook.synopsis)).toBeTruthy()
    expect(getByText('Ler Livro')).toBeTruthy()
    expect(getByText('Fazer avaliação do Livro')).toBeTruthy()
  })

  it('permite navegar para leitura e avaliação', () => {
    const { getByText } = renderWithNavigation(<BookDetailsScreen />)

    fireEvent.press(getByText('Ler Livro'))
    expect(ExpoRouter.router.navigate).toHaveBeenCalledWith(
      '/(system)/(reading)/read/book-1'
    )

    fireEvent.press(getByText('Fazer avaliação do Livro'))
    expect(ExpoRouter.router.navigate).toHaveBeenCalledWith(
      '/(system)/(reading)/avaliation/book-1'
    )
  })

  it('permite favoritar livro', () => {
    const toggleFavorite = jest.fn()
    ;(useBook as jest.Mock).mockReturnValueOnce({
      ...useBook(),
      toggleFavorite,
      isFavorite: false,
    })

    const { getByTestId } = renderWithNavigation(<BookDetailsScreen />)

    fireEvent.press(getByTestId('favorite-button'))
    expect(toggleFavorite).toHaveBeenCalled()
  })

  it('exibe apenas 3 avaliações por página e permite paginação', async () => {
    const { getByText } = renderWithNavigation(<BookDetailsScreen />)

    fireEvent.press(getByText('Próxima página'))

    await waitFor(() => {
      expect(getByText('Bom livro')).toBeTruthy()
    })

    fireEvent.press(getByText('Página anterior'))

    await waitFor(() => {
      expect(getByText('Livro Ruim.')).toBeTruthy()
    })
  })
})
