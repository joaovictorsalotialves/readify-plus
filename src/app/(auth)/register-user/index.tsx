import { router } from 'expo-router'
import { useState } from 'react'
import { Keyboard, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'
import { Header } from '../_components/header'

import { validateEmail } from '@/utils/validators/validate-email'
import { authStyles } from '../_styles/styles'
import { useRegister } from '@/hooks/useRegister'
import validadeNewPassword from '@/utils/validators/validate-newPassword'
import validadeConfirmationPassword from '@/utils/validators/validate-confirmationPassword'

export default function RegisterUser() {
  const { setRegisterData } = useRegister()

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

  function handleNameChange(text: string) {
    setName(text)
    setNameError(text.trim() === '' ? 'Nome é obrigatório' : '')
  }

  function handleUsernameChange(text: string) {
    setUsername(text)
    setUsernameError(text.trim() === '' ? 'Sobrenome é obrigatório' : '')
  }

  function handleEmailChange(text: string) {
    setEmail(text)
    validateEmail(text, setEmailError)
  }

  function handlePasswordChange(text: string) {
    setPassword(text)
    validadeNewPassword(password, setPasswordError)
    validadeConfirmationPassword(confirmPassword, password, setConfirmPasswordError)
  }

  function handleConfirmPasswordChange(text: string) {
    setConfirmPassword(text)
    validadeConfirmationPassword(confirmPassword, password, setConfirmPasswordError)
  }

  function handleSubmit() {
    Keyboard.dismiss()

    const isValidEmail = validateEmail(email, setEmailError)
    const isNameValid = name.trim() !== ''
    const isUsernameValid = username.trim() !== ''
    const isPasswordValid = validadeNewPassword(password, setPasswordError)
    const isConfirmPasswordValid = confirmPassword === password

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
    }
  }

  return (
    <KeyboardAwareContainer>
      <View style={authStyles.container}>
        <Header backRoute="/login" />

        <View style={authStyles.body}>
          <Text style={authStyles.title}>Cadastrar-se</Text>
          <Text style={authStyles.subtitle}>Informações do usuário:</Text>

          <View style={authStyles.context}>
            <Input
              icon="person"
              placeholder="Nome"
              onChangeText={handleNameChange}
              isFilled={!!name}
              messageError={nameError}
              autoCapitalize="words"
            />

            <Input
              icon="person"
              placeholder="Username"
              onChangeText={handleUsernameChange}
              isFilled={!!username}
              messageError={usernameError}
              autoCapitalize="words"
            />

            <Input
              icon="mail"
              placeholder="Email"
              onChangeText={handleEmailChange}
              isFilled={!!email}
              messageError={emailError}
              autoCapitalize="none"
            />

            <Input
              icon="lock"
              placeholder="Senha"
              onChangeText={handlePasswordChange}
              isFilled={!!password}
              messageError={passwordError}
              secureTextEntry
            />

            <Input
              icon="lock"
              placeholder="Confirmar Senha"
              onChangeText={handleConfirmPasswordChange}
              isFilled={!!confirmPassword}
              messageError={confirmPasswordError}
              secureTextEntry
            />

            <View style={authStyles.context}>
              <Button
                text='Continuar'
                type="confirm"
                onPress={handleSubmit}
              />
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
