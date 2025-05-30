import RegisterUser from '@/app/(auth)/register-user'
import { useRegister } from '@/hooks/useRegister'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { router } from 'expo-router'
import React from 'react'

jest.mock('@expo/vector-icons', () => {
  const React = require('react')
  const { Text } = require('react-native')

  return {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    MaterialIcons: (props: any) => <Text>{props.name}</Text>,
  }
})

jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
  },
}))

jest.mock('@/hooks/useRegister', () => ({
  useRegister: jest.fn(),
}))

jest.mock('@/utils/validators/validate-email', () => ({
  validateEmail: jest.fn(() => true),
}))

jest.mock('@/utils/validators/validate-newPassword', () => ({
  __esModule: true,
  default: jest.fn(() => true),
}))

jest.mock('@/utils/validators/validate-confirmationPassword', () => ({
  __esModule: true,
  default: jest.fn(() => true),
}))

describe('RegisterUser', () => {
  const setRegisterDataMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRegister as jest.Mock).mockReturnValue({
      registerData: {},
      setRegisterData: setRegisterDataMock,
    })
  })

  it('preenche todos os campos e navega para preferências ao pressionar "Continuar"', async () => {
    const { getByPlaceholderText, getByText } = render(<RegisterUser />)

    fireEvent.changeText(getByPlaceholderText('Nome'), 'João')
    fireEvent.changeText(getByPlaceholderText('Username'), 'Silva')
    fireEvent.changeText(getByPlaceholderText('Email'), 'joao@email.com')
    fireEvent.changeText(getByPlaceholderText('Senha'), 'SenhaSegura1')
    fireEvent.changeText(
      getByPlaceholderText('Confirmar Senha'),
      'SenhaSegura1'
    )

    fireEvent.press(getByText('Continuar'))

    await waitFor(() => {
      expect(setRegisterDataMock).toHaveBeenCalledWith({
        name: 'João',
        username: 'Silva',
        email: 'joao@email.com',
        password: 'SenhaSegura1',
        passwordConfirmation: 'SenhaSegura1',
      })

      expect(router.navigate).toHaveBeenCalledWith(
        '/(auth)/register-preferences'
      )
    })
  })

  it('navega para login ao pressionar "Já tenho conta"', () => {
    const { getByText } = render(<RegisterUser />)
    fireEvent.press(getByText('Já tenho conta'))

    expect(router.navigate).toHaveBeenCalledWith('/login')
  })

  it('exibe mensagens de erro quando os campos estão vazios', async () => {
    const { getByText } = render(<RegisterUser />)

    fireEvent.press(getByText('Continuar'))

    await waitFor(() => {
      // Espera que o botão não chame navegação nem setRegisterData
      expect(setRegisterDataMock).not.toHaveBeenCalled()
      expect(router.navigate).not.toHaveBeenCalled()
    })
  })
})
