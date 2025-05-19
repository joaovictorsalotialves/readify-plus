import { act, fireEvent, render, waitFor } from '@testing-library/react-native'
import { router } from 'expo-router'
import { Alert } from 'react-native'

import Login from '@/app/(auth)/login/index'
import * as useAuthModule from '@/hooks/useAuth'

import { mockAuthenticationResponse } from '@/../__mocks__/api/mockAuthenticationApiResponse'
import { AuthContext } from '@/contexts/AuthContext'
import { AxiosError, AxiosHeaders } from 'axios'

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}))

jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
    replace: jest.fn(),
  },
}))

const mockLogin = jest.fn()
const mockAuth = jest.fn()

jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    login: mockLogin,
    auth: mockAuth,
    isLoading: false,
  }),
}))

jest.mock('@expo/vector-icons', () => {
  const React = require('react')
  const { Text } = require('react-native')

  return {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    MaterialIcons: (props: any) => <Text>{props.name}</Text>,
  }
})

describe('Login Screen', () => {
  const renderWithContext = (isLoading = false) =>
    render(
      <AuthContext.Provider
        value={{
          user: null,
          login: mockLogin,
          auth: mockAuth,
          isLoading,
        }}
      >
        <Login />
      </AuthContext.Provider>
    )

  beforeEach(() => {
    jest.clearAllMocks()

    jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      login: mockLogin,
      auth: mockAuth,
      user: null,
      isLoading: false,
    })
  })

  it('should render inputs and buttons correctly', () => {
    const { getByPlaceholderText, getByText } = renderWithContext()

    expect(getByPlaceholderText('E-mail')).toBeTruthy()
    expect(getByPlaceholderText('Senha')).toBeTruthy()
    expect(getByText('Logar')).toBeTruthy()
    expect(getByText('Cadastrar-se')).toBeTruthy()
    expect(getByText('Esqueceu a senha?')).toBeTruthy()
  })

  it('should call handleEmailChange and handlePasswordChange when typing', async () => {
    const { getByPlaceholderText } = renderWithContext()

    const emailInput = getByPlaceholderText('E-mail')
    const passwordInput = getByPlaceholderText('Senha')

    await act(async () => {
      fireEvent.changeText(emailInput, 'test@example.com')
      fireEvent.changeText(passwordInput, 'password123')
    })

    expect(emailInput.props.value).toBe('test@example.com')
    expect(passwordInput.props.value).toBe('password123')
  })

  it('should navigate to password recovery screen when clicking "Esqueceu a senha?"', async () => {
    const { getByText } = renderWithContext()

    await act(async () => {
      fireEvent.press(getByText('Esqueceu a senha?'))
    })

    expect(router.navigate).toHaveBeenCalledWith('/password-recovery')
  })

  it('should navigate to register user screen when clicking "Cadastrar-se"', async () => {
    const { getByText } = renderWithContext()

    await act(async () => {
      fireEvent.press(getByText('Cadastrar-se'))
    })

    expect(router.navigate).toHaveBeenCalledWith('/register-user')
  })

  it('should show error when email wrong', () => {
    const { getByText, getByPlaceholderText } = renderWithContext()

    fireEvent.changeText(getByPlaceholderText('E-mail'), 'invalidexample')

    fireEvent.press(getByText('Logar'))

    expect(getByText('E-mail inválido!')).toBeTruthy()
  })

  it('should show error when inputs are empty', () => {
    const { getByText } = renderWithContext()

    fireEvent.press(getByText('Logar'))

    expect(getByText('E-mail obrigatório!')).toBeTruthy()
    expect(getByText('Senha obrigatória!')).toBeTruthy()
  })

  it('should show an alert if authentication fails', async () => {
    jest.spyOn(Alert, 'alert')

    const mockError = new AxiosError(
      'Unauthorized',
      '401',
      { headers: new AxiosHeaders() },
      {},
      {
        data: {
          message: 'Invalid Credentials.',
        },
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } as any
    )

    mockLogin.mockRejectedValueOnce(mockError)

    const { getByText, getByPlaceholderText } = renderWithContext()

    fireEvent.changeText(getByPlaceholderText('E-mail'), 'invalid@example.com')
    fireEvent.changeText(getByPlaceholderText('Senha'), 'invalidpassword')

    await act(async () => {
      fireEvent.press(getByText('Logar'))
    })

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        'invalid@example.com',
        'invalidpassword'
      )
      expect(Alert.alert).toHaveBeenCalledWith('Invalid Credentials.')
    })
  })

  it('should call login and navigate on successful authentication', async () => {
    mockLogin.mockResolvedValue(mockAuthenticationResponse)

    const { getByText, getByPlaceholderText } = renderWithContext()

    fireEvent.changeText(getByPlaceholderText('E-mail'), 'test@example.com')
    fireEvent.changeText(getByPlaceholderText('Senha'), 'password123')

    await act(async () => {
      fireEvent.press(getByText('Logar'))
    })

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123')
      expect(router.replace).toHaveBeenCalledWith('/(system)/(tabs)/home')
    })
  })

  it('should call login show loading indicator', async () => {
    mockLogin.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 1000))
    )

    const { getByText, getByPlaceholderText, queryByTestId } =
      renderWithContext()

    fireEvent.changeText(getByPlaceholderText('E-mail'), 'test@example.com')
    fireEvent.changeText(getByPlaceholderText('Senha'), 'password123')

    await act(async () => {
      fireEvent.press(getByText('Logar'))
    })

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeTruthy()
    })
  })
})
