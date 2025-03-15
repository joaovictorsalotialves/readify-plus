import { useState } from 'react'

import { router } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'

import styles from './styles'

import { regex } from '@/utils/regex'

export default function Login() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  function validateEmail(email: string) {
    setEmail(email)

    if (!email) return setEmailError('Email vazio!')
    if (!regex.emailRegex.test(email)) return setEmailError('Email inválido!')
    setEmailError('')
  }

  function validatePassword(password: string) {
    setPassword(password)

    if (!password) return setPasswordError('Senha vazia!')
    setPasswordError('')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('@/assets/logo_small.png')} />
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.box}>
          <View style={styles.box}>
            <Input
              icon="mail"
              placeholder="E-mail"
              onChangeText={validateEmail}
              isFilled={!!email}
              messageError={emailError}
              autoCapitalize="none"
            />
            <Input
              icon="lock"
              placeholder="Senha"
              onChangeText={validatePassword}
              isFilled={!!password}
              messageError={passwordError}
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => router.navigate('/password-recovery')}
          >
            <Text style={{ textAlign: 'right' }}>Esqueceu a senha?</Text>
          </TouchableOpacity>
          <View style={styles.box}>
            <Button text="Login" type="confirm" />
            <Button text="Cadastrar-se" type="redirect" />
          </View>
        </View>
      </View>
    </View>
  )
}
