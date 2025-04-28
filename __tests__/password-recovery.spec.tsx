import { fireEvent, render } from '@testing-library/react-native'

import PasswordRecovery from '@/app/(auth)/password-recovery'
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

describe('<PasswordRecovery />', () => {
  it('should render the screen correctly', () => {
    const { getByText, getByPlaceholderText } = render(<PasswordRecovery />)

    expect(getByText('Recuperar Senha')).toBeTruthy()
    expect(getByText('Informe seu email:')).toBeTruthy()
    expect(getByPlaceholderText('E-mail')).toBeTruthy()
    expect(getByText('Recuperar senha')).toBeTruthy()
    expect(getByText('Fazer login')).toBeTruthy()
  })

  it('should navigate to /password-confirmation when email is valid', () => {
    const { getByPlaceholderText, getByText } = render(<PasswordRecovery />)

    const emailInput = getByPlaceholderText('E-mail')
    const recoverButton = getByText('Recuperar senha')

    fireEvent.changeText(emailInput, 'valid@email.com')
    fireEvent.press(recoverButton)

    expect(router.navigate).toHaveBeenCalledWith('/password-confirmation')
  })

  it('should show error when email is empty', () => {
    const { getByText } = render(<PasswordRecovery />)

    const recoverButton = getByText('Recuperar senha')
    fireEvent.press(recoverButton)

    expect(getByText('E-mail obrigatório!')).toBeTruthy()
  })

  it('should show error for invalid email format', () => {
    const { getByPlaceholderText, getByText } = render(<PasswordRecovery />)

    const emailInput = getByPlaceholderText('E-mail')
    const recoverButton = getByText('Recuperar senha')

    fireEvent.changeText(emailInput, 'usuario@teste')
    fireEvent.press(recoverButton)

    expect(getByText('E-mail inválido!')).toBeTruthy()
  })

  it('should navigate to /login when press Fazer login', () => {
    const { getByText } = render(<PasswordRecovery />)

    const loginButton = getByText('Fazer login')
    fireEvent.press(loginButton)

    expect(router.navigate).toHaveBeenCalledWith('/login')
  })
})
