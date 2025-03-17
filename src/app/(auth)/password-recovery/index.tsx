import { useState } from 'react'

import { router } from 'expo-router'
import { Keyboard, Text, View } from 'react-native'

import authStyles from '../_styles/styles'
import styles from './styles'

import { validateEmail } from '@/utils/validators/validate-email'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Header } from '../_components/header'

export default function PasswordRecovery() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  function handleEmailChange(value: string) {
    setEmail(value)
    validateEmail(value, setEmailError)
  }

  function handleSubmit() {
    Keyboard.dismiss()

    const isValidEmail = validateEmail(email, setEmailError)

    if (isValidEmail) {
      router.navigate('/password-confirmation')
    }
  }

  return (
    <View style={authStyles.container}>
      <Header backRoute="/login" />

      <View style={authStyles.body}>
        <Text style={authStyles.title}>Recuperar Senha</Text>
        <Text style={styles.subtitle}>Informe seu email:</Text>
        <View style={authStyles.context}>
          <Input
            icon="mail"
            placeholder="E-mail"
            onChangeText={handleEmailChange}
            isFilled={!!email}
            messageError={emailError}
            autoCapitalize="none"
          />
          <View style={authStyles.context}>
            <Button
              text="Recuperar senha"
              type="confirm"
              onPress={handleSubmit}
            />
            <Button
              text="Fazer login"
              type="redirect"
              onPress={() => {
                router.navigate('/login')
              }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
