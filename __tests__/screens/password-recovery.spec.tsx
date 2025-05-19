import { act, fireEvent, render, waitFor } from '@testing-library/react-native'
import { router } from 'expo-router'
import { Alert } from 'react-native'

import PasswordRecovery from '@/app/(auth)/password-recovery/index'

import { SendEmailToRecoverPasswordService } from '@/services/sendEmailToRecoverPasswordService'
import { storageRecoveryPasswordTokenSave } from '@/storage/storageRecoveryPasswordToken'
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

jest.mock('@/services/sendEmailToRecoverPasswordService')
jest.mock('@/storage/storageRecoveryPasswordToken')
jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
    replace: jest.fn(),
  },
}))

describe('PasswordRecovery Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render inputs and buttons correctly', () => {
    const { getByPlaceholderText, getByText } = render(<PasswordRecovery />)

    expect(getByPlaceholderText('E-mail')).toBeTruthy()
    expect(getByText('Recuperar senha')).toBeTruthy()
    expect(getByText('Fazer login')).toBeTruthy()
  })

  it('should handle email change and validate input', async () => {
    const { getByPlaceholderText } = render(<PasswordRecovery />)

    const emailInput = getByPlaceholderText('E-mail')

    await act(async () => {
      fireEvent.changeText(emailInput, 'test@example.com')
    })

    expect(emailInput.props.value).toBe('test@example.com')
  })

  it('should navigate to login screen when clicking "Fazer login"', async () => {
    const { getByText } = render(<PasswordRecovery />)

    await act(async () => {
      fireEvent.press(getByText('Fazer login'))
    })

    expect(router.navigate).toHaveBeenCalledWith('/login')
  })

  it('should navigate to password confirmation screen on successful recovery', async () => {
    ;(SendEmailToRecoverPasswordService as jest.Mock).mockResolvedValueOnce({
      recoveryPasswordToken: 'mocked-token',
    })

    const { getByText, getByPlaceholderText } = render(<PasswordRecovery />)

    fireEvent.changeText(getByPlaceholderText('E-mail'), 'test@example.com')

    await act(async () => {
      fireEvent.press(getByText('Recuperar senha'))
    })

    await waitFor(() => {
      expect(SendEmailToRecoverPasswordService).toHaveBeenCalledWith({
        email: 'test@example.com',
      })
      expect(storageRecoveryPasswordTokenSave).toHaveBeenCalledWith({
        recoveryPasswordToken: 'mocked-token',
      })
      expect(router.navigate).toHaveBeenCalledWith('/password-confirmation')
    })
  })

  it('should display an alert if recovery fails', async () => {
    jest.spyOn(Alert, 'alert')

    const mockError = new AxiosError(
      'Request failed',
      '400',
      { headers: new AxiosHeaders() },
      {},
      {
        data: {
          message: 'Resource Not Found.',
        },
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } as any
    )
    ;(SendEmailToRecoverPasswordService as jest.Mock).mockRejectedValueOnce(
      mockError
    )

    const { getByText, getByPlaceholderText } = render(<PasswordRecovery />)

    fireEvent.changeText(getByPlaceholderText('E-mail'), 'invalid@example.com')

    await act(async () => {
      fireEvent.press(getByText('Recuperar senha'))
    })

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Resource Not Found.')
    })
  })
})
