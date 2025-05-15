import { router } from 'expo-router'
import { useState } from 'react'
import { Keyboard, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'
import { Header } from '../_components/header'

import { validateEmail } from '@/utils/validators/validate-email'
import { authStyles } from '../_styles/styles'

export default function PasswordRecovery() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  function handleEmailChange(email: string) {
    setEmail(email)
    validateEmail(email, setEmailError)
  }

  function handleSubmit() {
    Keyboard.dismiss()
    const isValidEmail = validateEmail(email, setEmailError)

    if (isValidEmail) {
      router.navigate('/password-confirmation')
    }
  }

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [nameError, setNameError] = useState('')
  const [surnameError, setSurnameError] = useState('')

  // Função para atualizar o nome

  const handleNameChange = (text: string) => {
    setName(text)

    // Adicione validação, se necessário

    if (text.trim() === '') {
      setNameError('Nome é obrigatório')
    } else {
      setNameError('')
    }
  }

  // Função para atualizar o sobrenome

  const handleSurnameChange = (text: string) => {
    setSurname(text)

    // Adicione validação, se necessário

    if (text.trim() === '') {
      setSurnameError('Sobrenome é obrigatório')
    } else {
      setSurnameError('')
    }
  }

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  // Função para atualizar a senha

  const handlePasswordChange = (text: string) => {
    setPassword(text)
    if (text.trim() === '') {
      setPasswordError('Senha é obrigatória')
    } else {
      setPasswordError('')
    }
  }

  // Função para atualizar a confirmação da senha

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text)

    // Verificar se as senhas são iguais

    if (text !== password) {
      setConfirmPasswordError('As senhas não coincidem')
    } else {
      setConfirmPasswordError('')
    }
  }

  return (
    <KeyboardAwareContainer>
      <View style={authStyles.container}>
        <Header backRoute="/login" />

        <View style={authStyles.body}>
          <Text style={authStyles.title}>Cadastrar-se</Text>
          <Text style={authStyles.subtitle}>Informaçoes do usuario:</Text>

          <View style={authStyles.context}>
            <Input
              icon="person"
              placeholder="Nome"
              onChangeText={handleNameChange}
              isFilled={!!name}
              messageError={nameError}
              autoCapitalize="none"
            />
            <Input
              icon="person"
              placeholder="Sobrenome"
              onChangeText={handleSurnameChange}
              isFilled={!!surname}
              messageError={surnameError && 'Sobrenome é obrigatório'} // Mostra erro só se necessário }
              autoCapitalize="words"
            />
            <Input
              icon="mail"
              placeholder="Email"
              onChangeText={handleEmailChange}
              isFilled={!!email}
              messageError={emailError} // Mostra erro se o email estiver errado }
              autoCapitalize="none"
            />
            <Input
              icon="lock"
              placeholder="Senha"
              onChangeText={handlePasswordChange}
              isFilled={!!password}
              messageError={passwordError} // Mostra erro se a senha estiver vazia
              secureTextEntry={true} // Oculta o texto para campo de senha
            />

            {/* Campo de Confirmar Senha */}

            <Input
              icon="lock"
              placeholder="Confirmar Senha"
              onChangeText={handleConfirmPasswordChange}
              isFilled={!!confirmPassword}
              messageError={confirmPasswordError} // Mostra erro se as senhas não coincidirem
              secureTextEntry={true} // Oculta o texto para confirmar senha
            />

            <View style={authStyles.context}>
              <Button text="Continuar" type="confirm" onPress={handleSubmit} />
              <Button
                text="Ja tenho conta"
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
