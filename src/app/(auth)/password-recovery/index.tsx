import { useState } from 'react'

import { router } from 'expo-router'
import { Text, View } from 'react-native'

import authStyles from '../_styles/styles'
import styles from './styles'

import { regex } from '@/utils/regex'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Header } from '../_components/header'

export default function PasswordRecovery() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  function validateEmail(email: string) {
    setEmail(email)

    if (!email) return setEmailError('Email vazio!')
    if (!regex.emailRegex.test(email)) return setEmailError('Email inválido!')
    setEmailError('')
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
            onChangeText={validateEmail}
            isFilled={!!email}
            messageError={emailError}
            autoCapitalize="none"
          />
          <View style={authStyles.context}>
            <Button
              text="Recuperar senha"
              type="confirm"
              onPress={() => {
                router.navigate('/password-confirmation')
              }}
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
