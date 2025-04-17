import { act, fireEvent, render, waitFor } from '@testing-library/react-native'
import { router } from 'expo-router'
import PasswordConfirmation from '../src/app/(auth)/password-confirmation'

jest.mock('expo-font', () => ({
  loadAsync: () => Promise.resolve(),
  isLoaded: () => true,
}))

jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
    replace: jest.fn(),
  },
}))

describe('<PasswordConfirmation />', () => {
  it('should render screen correctly', () => {
    const { getByText, getByPlaceholderText } = render(<PasswordConfirmation />)

    expect(getByText('Recuperar Senha')).toBeTruthy()
    expect(getByPlaceholderText('Código')).toBeTruthy()
    expect(getByText('Verificar código')).toBeTruthy()
    expect(getByText('Reenviar e-mail')).toBeTruthy()
  })

  it('should navigate to reset password screen on valid code', () => {
    const { getByPlaceholderText, getByText } = render(<PasswordConfirmation />)

    const codeInput = getByPlaceholderText('Código')
    fireEvent.changeText(codeInput, '123456')
    fireEvent.press(getByText('Verificar código'))

    expect(router.navigate).toHaveBeenCalledWith('/password-reset')
  })

  it('should show error when code is empty', () => {
    const { getByText } = render(<PasswordConfirmation />)

    fireEvent.press(getByText('Verificar código'))

    expect(
      getByText('Formato inválido. O código deve ter exatamente 6 números.')
    ).toBeTruthy()
  })

  it('should show error when code is invalid', () => {
    const { getByText, getByPlaceholderText } = render(<PasswordConfirmation />)

    const codeInput = getByPlaceholderText('Código')
    fireEvent.changeText(codeInput, '123')
    fireEvent.press(getByText('Verificar código'))

    expect(
      getByText('Formato inválido. O código deve ter exatamente 6 números.')
    ).toBeTruthy()
  })

  it('should enable resend button after 60 seconds', async () => {
    jest.useFakeTimers()
    const { getByText } = render(<PasswordConfirmation />)

    await act(async () => {
      jest.advanceTimersByTime(60000)
    })

    await waitFor(() => {
      const resendButton = getByText('Reenviar e-mail')
      expect(resendButton.props.accessibilityState?.disabled).toBeFalsy()
    })

    jest.useRealTimers()
  })

  it('should replace route when clicking on resend button', async () => {
    jest.useFakeTimers()
    const { getByText } = render(<PasswordConfirmation />)

    await act(async () => {
      jest.advanceTimersByTime(60000)
    })

    await waitFor(() => {
      const resendButton = getByText('Reenviar e-mail')
      fireEvent.press(resendButton)
      expect(router.replace).toHaveBeenCalledWith('/password-confirmation')
    })

    jest.useRealTimers()
  })
})
