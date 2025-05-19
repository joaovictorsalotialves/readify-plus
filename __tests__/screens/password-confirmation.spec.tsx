import { act, fireEvent, render, waitFor } from '@testing-library/react-native'
import { router } from 'expo-router'
import { Alert } from 'react-native'

import PasswordConfirmation from '@/app/(auth)/password-confirmation/index'

import { ValidateRecoverPasswordCodeService } from '@/services/validateRecoveryPasswordCodeService'
import { storageRecoveryPasswordTokenGet } from '@/storage/storageRecoveryPasswordToken'
import { storageResetPasswordTokenSave } from '@/storage/storageResetPasswordToken'
import { AxiosError, AxiosHeaders } from 'axios'

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

jest.mock('@/services/validateRecoveryPasswordCodeService')
jest.mock('@/storage/storageRecoveryPasswordToken')
jest.mock('@/storage/storageResetPasswordToken')
jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
    replace: jest.fn(),
  },
}))

describe('PasswordConfirmation Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render inputs and button correctly', () => {
    const { getByPlaceholderText, getByText } = render(<PasswordConfirmation />)

    expect(getByPlaceholderText('Código')).toBeTruthy()
    expect(getByText('Verificar código')).toBeTruthy()
  })

  it('should navigate to password recovery if token is not found', async () => {
    ;(storageRecoveryPasswordTokenGet as jest.Mock).mockResolvedValueOnce({
      recoveryPasswordToken: '',
    })

    render(<PasswordConfirmation />)

    await waitFor(() => {
      expect(router.navigate).toHaveBeenCalledWith('/password-recovery')
    })
  })

  it('should validate code and navigate to password reset', async () => {
    const mockToken = 'mocked-recovery-token'
    ;(storageRecoveryPasswordTokenGet as jest.Mock).mockResolvedValueOnce({
      recoveryPasswordToken: mockToken,
    })
    ;(ValidateRecoverPasswordCodeService as jest.Mock).mockResolvedValueOnce({
      resetPasswordToken: 'mocked-reset-token',
    })

    const { getByPlaceholderText, getByText } = render(<PasswordConfirmation />)

    fireEvent.changeText(getByPlaceholderText('Código'), '123456')

    await waitFor(() => {
      expect(storageRecoveryPasswordTokenGet).toHaveBeenCalled()
    })

    await act(async () => {
      fireEvent.press(getByText('Verificar código'))
    })

    await waitFor(() => {
      expect(ValidateRecoverPasswordCodeService).toHaveBeenCalledWith({
        passwordRecoveryCode: '123456',
        recoveryPasswordToken: mockToken,
      })
      expect(storageResetPasswordTokenSave).toHaveBeenCalledWith({
        resetPasswordToken: 'mocked-reset-token',
      })
      expect(router.navigate).toHaveBeenCalledWith('/password-reset')
    })
  })

  it('should show alert if code validation fails', async () => {
    jest.spyOn(Alert, 'alert')
    const error = new AxiosError(
      'Unauthorized',
      '401',
      { headers: new AxiosHeaders() },
      {},
      {
        data: {
          message: 'Código inválido.',
        },
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } as any
    )
    ;(ValidateRecoverPasswordCodeService as jest.Mock).mockRejectedValueOnce(
      error
    )

    const { getByPlaceholderText, getByText } = render(<PasswordConfirmation />)

    fireEvent.changeText(getByPlaceholderText('Código'), '000000')

    await act(async () => {
      fireEvent.press(getByText('Verificar código'))
    })

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Código inválido.')
    })
  })
})
