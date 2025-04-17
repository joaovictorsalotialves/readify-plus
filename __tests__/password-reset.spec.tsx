import { fireEvent, render } from '@testing-library/react-native'

import PasswordReset from '@/app/(auth)/password-reset'
import { router } from 'expo-router'

jest.mock('expo-font', () => ({
  loadAsync: () => Promise.resolve(),
  isLoaded: () => true,
}))

jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
  },
}))

describe('<PasswordReset />', () => {
  it('should render screen correctly', () => {
    const { getByText, getByPlaceholderText } = render(<PasswordReset />)

    expect(getByText('Recuperar Senha')).toBeTruthy()
    expect(getByText('Informe uma nova senha:')).toBeTruthy()
    expect(getByPlaceholderText('Nova senha')).toBeTruthy()
    expect(getByPlaceholderText('Confirmar senha')).toBeTruthy()
    expect(getByText('Redefinir senha')).toBeTruthy()
  })

  it('should show required field errors if no input is given', () => {
    const { getByText } = render(<PasswordReset />)

    const resetButton = getByText('Redefinir senha')
    fireEvent.press(resetButton)

    expect(
      getByText(
        'A senha precisa ter no mínimo 8 caracteres. A senha deve conter pelo menos uma letra. A senha deve conter pelo menos um número. A senha deve conter pelo menos um caractere especial.'
      )
    ).toBeTruthy()
  })

  it('should show error if passwords do not match', () => {
    const { getByPlaceholderText, getByText } = render(<PasswordReset />)

    const newPasswordInput = getByPlaceholderText('Nova senha')
    const confirmationInput = getByPlaceholderText('Confirmar senha')
    const resetButton = getByText('Redefinir senha')

    fireEvent.changeText(newPasswordInput, 'Senha#1234')
    fireEvent.changeText(confirmationInput, 'SenhaDiferente123')
    fireEvent.press(resetButton)

    expect(getByText('Confirmação de senha é diferente da senha!')).toBeTruthy()
  })

  it('should navigate to /login if password and confirmation are valid and match', () => {
    const { getByPlaceholderText, getByText } = render(<PasswordReset />)

    const newPasswordInput = getByPlaceholderText('Nova senha')
    const confirmationInput = getByPlaceholderText('Confirmar senha')
    const resetButton = getByText('Redefinir senha')

    fireEvent.changeText(newPasswordInput, 'Senha#1234')
    fireEvent.changeText(confirmationInput, 'Senha#1234')
    fireEvent.press(resetButton)

    expect(router.navigate).toHaveBeenCalledWith('/login')
  })
})
