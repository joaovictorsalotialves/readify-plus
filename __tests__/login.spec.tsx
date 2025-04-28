import { fireEvent, render } from '@testing-library/react-native'

import { router } from 'expo-router'
import Login from '../src/app/(auth)/login/index'

jest.mock('expo-font', () => ({
  loadAsync: () => Promise.resolve(),
  isLoaded: () => true,
}))

jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
  },
}))

describe('<Login />', () => {
  it('should able renders login screen correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Login />)

    expect(getByText('Login')).toBeTruthy()
    expect(getByPlaceholderText('E-mail')).toBeTruthy()
    expect(getByPlaceholderText('Senha')).toBeTruthy()
    expect(getByText('Logar')).toBeTruthy()
    expect(getByText('Cadastrar-se')).toBeTruthy()
    expect(getByText('Esqueceu a senha?')).toBeTruthy()
  })

  it('should able navigates to home on valid form submission', () => {
    const { getByPlaceholderText, getByText } = render(<Login />)

    const emailInput = getByPlaceholderText('E-mail')
    const passwordInput = getByPlaceholderText('Senha')
    const loginButton = getByText('Logar')

    fireEvent.changeText(emailInput, 'valid@email.com')
    fireEvent.changeText(passwordInput, 'Senha#1234')
    fireEvent.press(loginButton)

    expect(router.navigate).toHaveBeenCalledWith('/(system)/(tabs)/home')
  })

  it('should able navigates to password recovery on press', () => {
    const { getByText } = render(<Login />)

    const forgotPassword = getByText('Esqueceu a senha?')
    fireEvent.press(forgotPassword)

    expect(router.navigate).toHaveBeenCalledWith('/password-recovery')
  })

  it('should able navigates to password recovery on press', () => {
    const { getByText } = render(<Login />)

    const forgotPassword = getByText('Esqueceu a senha?')
    fireEvent.press(forgotPassword)

    expect(router.navigate).toHaveBeenCalledWith('/password-recovery')
  })

  it('should show required field errors if email and password are empty', () => {
    const { getByText } = render(<Login />)

    const loginButton = getByText('Logar')

    fireEvent.press(loginButton)

    expect(getByText('E-mail obrigatório!')).toBeTruthy()
    expect(getByText('Senha obrigatória!')).toBeTruthy()
  })

  it('should show error message for invalid email format', () => {
    const { getByText, getByPlaceholderText } = render(<Login />)

    const emailInput = getByPlaceholderText('E-mail')
    const passwordInput = getByPlaceholderText('Senha')
    const loginButton = getByText('Logar')

    fireEvent.changeText(emailInput, 'usuario@teste')
    fireEvent.changeText(passwordInput, '123456')
    fireEvent.press(loginButton)

    expect(getByText('E-mail inválido!')).toBeTruthy()
  })
})
