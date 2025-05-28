import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Keyboard, Text, View } from 'react-native'

import { AuthHeader } from '@/components/auth-header'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'

import { useRegister } from '@/hooks/useRegister'
import validadeConfirmationPassword from '@/utils/validators/validate-confirmationPassword'
import { validateEmail } from '@/utils/validators/validate-email'
import validadeNewPassword from '@/utils/validators/validate-newPassword'
import { authStyles } from '../_styles/styles'

export default function RegisterUser() {
  const { registerData, setRegisterData } = useRegister()

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [nameError, setNameError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  function handleNameChange(name: string) {
    setName(name)
    setNameError(name === '' ? 'Nome é obrigatório' : '')
  }

  function handleUsernameChange(username: string) {
    setUsername(username)
    setUsernameError(username === '' ? 'Sobrenome é obrigatório' : '')
  }

  function handleEmailChange(email: string) {
    setEmail(email.trim())
    validateEmail(email.trim(), setEmailError)
  }

  function handlePasswordChange(password: string) {
    setPassword(password.trim())
    validadeNewPassword(password.trim(), setPasswordError)
    validadeConfirmationPassword(
      confirmPassword,
      password.trim(),
      setConfirmPasswordError
    )
  }

  function handleConfirmationPasswordChange(confirmationPassword: string) {
    setConfirmPassword(confirmationPassword.trim())
    validadeConfirmationPassword(
      confirmationPassword.trim(),
      password,
      setConfirmPasswordError
    )
  }

  function handleSubmit() {
    Keyboard.dismiss()

    const isValidEmail = validateEmail(email, setEmailError)
    const isNameValid = name.trim() !== ''
    const isUsernameValid = username.trim() !== ''
    const isPasswordValid = validadeNewPassword(password, setPasswordError)
    const isConfirmPasswordValid = validadeConfirmationPassword(
      confirmPassword,
      password,
      setConfirmPasswordError
    )

    if (
      isValidEmail &&
      isNameValid &&
      isUsernameValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      setRegisterData({
        name,
        username,
        email,
        password,
        passwordConfirmation: confirmPassword,
      })

      router.navigate('/(auth)/register-preferences')
    }
  }

  return (
    <KeyboardAwareContainer>
      <View style={authStyles.container}>
        <AuthHeader backRoute="/login" />

        <View style={authStyles.body}>
          <Text style={authStyles.title}>Cadastrar-se</Text>
          <Text style={authStyles.subtitle}>Informações do usuário:</Text>

          <View style={authStyles.context}>
            <Input
              icon="person"
              placeholder="Nome"
              onChangeText={handleNameChange}
              value={name}
              isFilled={!!name}
              messageError={nameError}
              autoCapitalize="words"
            />

            <Input
              icon="person"
              placeholder="Username"
              onChangeText={handleUsernameChange}
              value={username}
              isFilled={!!username}
              messageError={usernameError}
              autoCapitalize="words"
            />

            <Input
              icon="mail"
              placeholder="Email"
              onChangeText={handleEmailChange}
              value={email}
              isFilled={!!email}
              messageError={emailError}
              autoCapitalize="none"
            />

            <Input
              icon="lock"
              placeholder="Senha"
              onChangeText={handlePasswordChange}
              value={password}
              isFilled={!!password}
              messageError={passwordError}
              autoCapitalize="none"
              secureTextEntry
            />

            <Input
              icon="lock"
              placeholder="Confirmar Senha"
              onChangeText={handleConfirmationPasswordChange}
              value={confirmPassword}
              isFilled={!!confirmPassword}
              messageError={confirmPasswordError}
              autoCapitalize="none"
              secureTextEntry
            />

            <View style={authStyles.context}>
              <Button text="Continuar" type="confirm" onPress={handleSubmit} />
              <Button
                text="Já tenho conta"
                type="redirect"
                onPress={() => router.navigate('/login')}
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareContainer>
  )
}
