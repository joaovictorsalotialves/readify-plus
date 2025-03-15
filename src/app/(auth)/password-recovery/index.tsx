import { useState } from 'react'

import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

import { colors } from '@/styles/colors'
import styles from './styles'

import { regex } from '@/utils/regex'

import { Button } from '@/components/button'
import { Input } from '@/components/input'

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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            router.navigate('/login')
          }}
        >
          <MaterialIcons name="arrow-back" size={68} color={colors.gray[100]} />
        </TouchableOpacity>
        <Text style={styles.headerLogo}>Readify Plus</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>Recuperar Senha</Text>
        <Text style={styles.subtitle}>Informe seu email:</Text>
        <View style={styles.box}>
          <Input
            icon="mail"
            placeholder="E-mail"
            onChangeText={validateEmail}
            isFilled={!!email}
            messageError={emailError}
            autoCapitalize="none"
          />
          <View style={styles.box}>
            <Button text="Recuperar senha" type="confirm" />
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
