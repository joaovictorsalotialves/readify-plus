jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(() => ({ id: '1' })),
  useFocusEffect: jest.fn(cb => cb()),
  router: {
    replace: jest.fn(),
    back: jest.fn(),
    navigate: jest.fn(),
  },
  useLoadedNavigation: () => ({
    current: {
      navigate: jest.fn(),
      goBack: jest.fn(),
    },
  }),
}))

import { fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'
import { Alert } from 'react-native'

import RegisterPreference from '@/app/(auth)/register-preferences'
import { useBookCategories } from '@/hooks/useBookCategories'
import { useRegister } from '@/hooks/useRegister'
import { useWriters } from '@/hooks/useWriters'
import { router } from 'expo-router'

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

jest.mock('@/hooks/useRegister')
jest.mock('@/hooks/useBookCategories')
jest.mock('@/hooks/useWriters')

jest.spyOn(Alert, 'alert')

describe('RegisterPreference', () => {
  const mockSetPreferences = jest.fn()
  const mockRegister = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRegister as jest.Mock).mockReturnValue({
      registerData: { name: 'João', email: 'joao@mail.com' },
      setPreferences: mockSetPreferences,
      register: mockRegister,
    })
    ;(useBookCategories as jest.Mock).mockReturnValue({
      isLoadingBookCategories: false,
      bookCategories: [
        { id: '1', name: 'Fantasia' },
        { id: '2', name: 'Suspense' },
        { id: '3', name: 'Romance' },
      ],
      getBookCategories: jest.fn(),
    })
    ;(useWriters as jest.Mock).mockReturnValue({
      isLoadingWriters: false,
      writers: [
        { id: 'a', name: 'Tolkien' },
        { id: 'b', name: 'Agatha' },
        { id: 'c', name: 'Machado' },
      ],
      getWriters: jest.fn(),
    })
  })

  it('renderiza título e botões principais', () => {
    const { getByText, getByTestId } = render(<RegisterPreference />)

    expect(getByTestId('button-register')).toBeTruthy()
    expect(
      getByText('Escolha seus gêneros e escritores favoritos:')
    ).toBeTruthy()
    expect(getByText('Gêneros')).toBeTruthy()
    expect(getByText('Escritores')).toBeTruthy()
    expect(getByText('Voltar')).toBeTruthy()
  })

  it('valida seleção mínima antes de registrar', () => {
    jest.spyOn(Alert, 'alert')

    const { getByTestId } = render(<RegisterPreference />)

    fireEvent.press(getByTestId('button-register'))

    expect(Alert.alert).toHaveBeenCalledWith(
      'Por favor, selecione pelo dois gênero e dois escritor!'
    )
    expect(mockRegister).not.toHaveBeenCalled()
  })

  it('permite selecionar gêneros e escritores e registra com sucesso', async () => {
    const { getByText, getByTestId } = render(<RegisterPreference />)

    fireEvent.press(getByText('Fantasia'))
    fireEvent.press(getByText('Suspense'))
    fireEvent.press(getByText('Tolkien'))
    fireEvent.press(getByText('Agatha'))

    fireEvent.press(getByTestId('button-register'))

    await waitFor(() => {
      expect(mockSetPreferences).toHaveBeenCalled()
      expect(mockRegister).toHaveBeenCalled()
      expect(router.replace).toHaveBeenCalledWith('/(system)/(tabs)/home')
    })
  })

  it('mostra alerta ao falhar no registro', async () => {
    ;(mockRegister as jest.Mock).mockRejectedValue({
      response: { data: { message: 'Erro ao cadastrar' } },
      isAxiosError: true,
    })

    const { getByText, getByTestId } = render(<RegisterPreference />)

    fireEvent.press(getByText('Fantasia'))
    fireEvent.press(getByText('Suspense'))
    fireEvent.press(getByText('Tolkien'))
    fireEvent.press(getByText('Agatha'))

    fireEvent.press(getByTestId('button-register'))

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Não foi possivel cadastrar o usuário. Tente novamente'
      )
    })
  })
})
