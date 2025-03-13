import { useState } from 'react'

import { Image, Text, TouchableOpacity, View } from 'react-native'

import styles from './styles'

import { Input } from '@/components/input'

export default function Login() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  function changeEmail(email: string) {
    setEmail(email)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return setEmailError('Email inválido!')

    setEmailError('')
  }

  function changePassword(password: string) {
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
        <View style={styles.containerForm}>
          <View style={styles.containerFields}>
            <Input
              icon="mail"
              placeholder="Email"
              onChangeText={changeEmail}
              isFilled={!!email}
              messageError={emailError}
              autoCapitalize="none"
            />
            <Input
              icon="lock"
              onChangeText={setPassword}
              isFilled={!!password}
              placeholder="Senha"
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity>
            <Text>Esqueceu a senha?</Text>
          </TouchableOpacity>
          <View>
            <Text>Buttons</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
