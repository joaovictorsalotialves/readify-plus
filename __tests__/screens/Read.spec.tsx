import { act, fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'

import * as useAuthModule from '@/hooks/useAuth'
import * as useBookModule from '@/hooks/useBook'
import * as useReadingModule from '@/hooks/useReading'

import { mockBook } from '../../__mocks__/dtos/mockBookDTO'
import { mockReading } from '../../__mocks__/dtos/mockReadingDTO'
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
    useLocalSearchParams: () => ({ bookId: '123' }),
    useFocusEffect: jest.fn(cb => cb()),
    useRouter: () => ({ back: jest.fn() }),
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    Redirect: ({ href }: any) => <Text>{`Redirecting to ${href}`}</Text>,
  }
})

jest.mock('react-native-pdf', () => {
  const { View, Text } = require('react-native')
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return (props: any) => (
    <View testID="pdf-viewer">
      <Text>PDF Viewer Page {props.page}</Text>
    </View>
  )
})

jest.mock('expo-file-system', () => ({
  documentDirectory: 'file:///mock/',
  getInfoAsync: jest
    .fn()
    .mockResolvedValue({ exists: true, uri: 'file:///mock/mock.pdf' }),
  downloadAsync: jest.fn().mockResolvedValue({ uri: 'file:///mock/mock.pdf' }),
}))

jest.mock('@/components/resource-header', () => {
  const React = require('react')
  const { Text } = require('react-native')

  return {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ResourceHeader: ({ title }: any) => React.createElement(Text, null, title),
  }
})

jest.mock('@/components/asside', () => {
  const React = require('react')
  const { Text, View } = require('react-native')

  return {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    Asside: ({ children }: any) => <View>{children}</View>,

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    AssideButton: ({ icon, onPress }: any) =>
      React.createElement(Text, { onPress }, icon),

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ContainerAssideButtons: ({ children }: any) =>
      React.createElement(React.Fragment, null, children),
  }
})

jest.mock('@/components/loading', () => {
  const React = require('react')
  const { Text } = require('react-native')

  return {
    Loading: () =>
      React.createElement(Text, { testID: 'loading-indicator' }, 'Loading...'),
  }
})

import Read from '@/app/(system)/(reading)/read/[bookId]'

const mockSetPage = jest.fn()

describe('Read Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      isLoading: false,
      user: mockUser,
      auth: jest.fn(),
      login: jest.fn(),
    })

    jest.spyOn(useBookModule, 'useBook').mockReturnValue({
      isLoadingBook: false,
      book: { ...mockBook, bookPath: 'mock.pdf', numberPage: 10 },
      getBook: jest.fn(),
      isFavorite: false,
      toggleFavorite: jest.fn(),
      removeBookReview: jest.fn(),
    })

    jest.spyOn(useReadingModule, 'useReading').mockReturnValue({
      isLoadingReading: false,
      reading: mockReading,
      getOrCreateReading: jest.fn(),
      saveProgressReading: jest.fn(),
      page: 1,
      setPage: mockSetPage,
    })
  })

  it('should redirect if user is null', async () => {
    jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      isLoading: false,
      user: null,
      auth: jest.fn(),
      login: jest.fn(),
    })

    const { getByText } = render(<Read />)

    await waitFor(() => {
      expect(getByText('Redirecting to /(auth)/login')).toBeTruthy()
    })
  })

  it('should show loading if isLoading is true', () => {
    jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      isLoading: true,
      user: mockUser,
      auth: jest.fn(),
      login: jest.fn(),
    })

    const { getByTestId } = render(<Read />)
    expect(getByTestId('loading-indicator')).toBeTruthy()
  })

  it.skip('should render PDF when loaded', async () => {
    // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
    let result

    await act(async () => {
      result = render(<Read />)
      const { getByTestId, getByText } = result

      await waitFor(() => {
        expect(getByTestId('pdf-viewer')).toBeTruthy()
        expect(getByText('PDF Viewer Page 1')).toBeTruthy()
      })
    })
  })

  it.skip('should toggle controls on tap', async () => {
    const { getByText, queryByText } = render(<Read />)

    await waitFor(() => {
      expect(getByText(mockBook.title)).toBeTruthy()
    })

    // Disparar evento que deve esconder controles
    fireEvent.press(getByText('PDF Viewer Page 1'))

    // Esperar até que o título desapareça da tela
    await waitFor(() => {
      expect(queryByText(mockBook.title)).toBeNull()
    })
  })

  it.skip('should increase page on swipe left and decrease on swipe right', async () => {
    const { getByText, getByTestId } = render(<Read />)

    const pdf = getByTestId('pdf-viewer')

    // Simula swipe para esquerda (dx negativo)
    fireEvent(pdf, 'panResponderRelease', {}, { dx: -60 })
    expect(mockSetPage).toHaveBeenCalledWith(expect.any(Function))

    // Simula swipe para direita (dx positivo)
    fireEvent(pdf, 'panResponderRelease', {}, { dx: 60 })
    expect(mockSetPage).toHaveBeenCalledWith(expect.any(Function))
  })

  it('should go to previous and next page using buttons', async () => {
    const { getByText } = render(<Read />)

    fireEvent.press(getByText('keyboard-arrow-left'))
    fireEvent.press(getByText('keyboard-arrow-right'))

    expect(mockSetPage).toHaveBeenCalledTimes(2)
  })
})
