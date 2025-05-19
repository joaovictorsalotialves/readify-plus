import { act, fireEvent, render, waitFor } from '@testing-library/react-native'
import { router } from 'expo-router'
import { Alert } from 'react-native'

import PasswordReset from '@/app/(auth)/password-reset/index'
import { ResetPasswordService } from '@/services/resetPasswordService'
import { storageAuthTokenSave } from '@/storage/storageAuthToken'
import { storageResetPasswordTokenGet } from '@/storage/storageResetPasswordToken'

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

jest.mock('@/services/resetPasswordService')
jest.mock('@/storage/storageAuthToken')
jest.mock('@/storage/storageResetPasswordToken')

jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
    replace: jest.fn(),
  },
}))

jest.spyOn(Alert, 'alert')

describe('PasswordReset Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const renderWithContext = () => render(<PasswordReset />)

  it('should render inputs and button correctly', () => {
    const { getByPlaceholderText, getByText } = renderWithContext()

    expect(getByPlaceholderText('Nova senha')).toBeTruthy()
    expect(getByPlaceholderText('Confirmar senha')).toBeTruthy()
    expect(getByText('Redefinir senha')).toBeTruthy()
  })

  it('should call handleNewPasswordChange and handleConfirmationPasswordChange when typing', async () => {
    const { getByPlaceholderText } = renderWithContext()

    const newPasswordInput = getByPlaceholderText('Nova senha')
    const confirmationPasswordInput = getByPlaceholderText('Confirmar senha')

    await act(async () => {
      fireEvent.changeText(newPasswordInput, 'new-password-123')
      fireEvent.changeText(confirmationPasswordInput, 'new-password-123')
    })

    expect(newPasswordInput.props.value).toBe('new-password-123')
    expect(confirmationPasswordInput.props.value).toBe('new-password-123')
  })

  it('should show required field errors if no input is given', async () => {
    const { getByText } = renderWithContext()

    const resetButton = getByText('Redefinir senha')
    fireEvent.press(resetButton)

    await waitFor(() => {
      expect(
        getByText(
          'A senha precisa ter no mínimo 8 caracteres. A senha deve conter pelo menos uma letra. A senha deve conter pelo menos um número. A senha deve conter pelo menos um caractere especial.'
        )
      ).toBeTruthy()
    })
  })

  it('should show error if passwords do not match', async () => {
    const { getByPlaceholderText, getByText } = renderWithContext()

    const newPasswordInput = getByPlaceholderText('Nova senha')
    const confirmationInput = getByPlaceholderText('Confirmar senha')
    const resetButton = getByText('Redefinir senha')

    fireEvent.changeText(newPasswordInput, 'Senha#1234')
    fireEvent.changeText(confirmationInput, 'SenhaDiferente123')
    fireEvent.press(resetButton)

    await waitFor(() => {
      expect(
        getByText('Confirmação de senha é diferente da senha!')
      ).toBeTruthy()
    })
  })

  it('should navigate to password recovery if token is not found', async () => {
    ;(storageResetPasswordTokenGet as jest.Mock).mockResolvedValueOnce({})

    renderWithContext()

    await waitFor(() => {
      expect(router.navigate).toHaveBeenCalledWith('/password-recovery')
    })
  })

  it('should reset password successfully and navigate to home', async () => {
    ;(storageResetPasswordTokenGet as jest.Mock).mockResolvedValueOnce({
      resetPasswordToken: 'mocked-reset-token',
    })
    ;(ResetPasswordService as jest.Mock).mockResolvedValueOnce({
      token: 'mocked-token',
      refreshToken: 'mocked-refresh-token',
    })

    const { getByPlaceholderText, getByText } = renderWithContext()

    fireEvent.changeText(getByPlaceholderText('Nova senha'), 'newPassword#123')
    fireEvent.changeText(
      getByPlaceholderText('Confirmar senha'),
      'newPassword#123'
    )

    await waitFor(() => {
      expect(storageResetPasswordTokenGet).toHaveBeenCalled()
    })

    await act(async () => {
      fireEvent.press(getByText('Redefinir senha'))
    })

    await waitFor(() => {
      expect(storageAuthTokenSave).toHaveBeenCalledWith({
        token: 'mocked-token',
        refreshToken: 'mocked-refresh-token',
      })
      expect(router.replace).toHaveBeenCalledWith('/(system)/(tabs)/home')
    })
  })
})
