import { useState } from 'react'

import { router } from 'expo-router'
import { Image, Keyboard, Text, TouchableOpacity, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { validatePassword } from '@/utils/validators/validate-password'

import { authStyles } from '../_styles/styles'
import { styles } from './styles'

import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'
import { validateEmail } from '@/utils/validators/validate-email'

export default function Login() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  function handleEmailChange(email: string) {
    setEmail(email)
    validateEmail(email, setEmailError)
  }

  function handlePasswordChange(password: string) {
    setPassword(password)
    validatePassword(password, setPasswordError)
  }

  function handleSubmit() {
    Keyboard.dismiss()

    const isValidEmail = validateEmail(email, setEmailError)
    const isValidPassword = validatePassword(password, setPasswordError)

    if (isValidEmail || isValidPassword) {
      router.navigate('/(system)/(tabs)/home')
    }
  }

  return (
    <KeyboardAwareContainer>
      <View style={authStyles.container}>
        <View style={styles.header}>
          <Image source={require('@/assets/logo_small.png')} />
        </View>

        <View style={authStyles.body}>
          <Text style={authStyles.title}>Login</Text>
          <View style={authStyles.context}>
            <View style={authStyles.context}>
              <Input
                icon="mail"
                placeholder="E-mail"
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
                autoCapitalize="none"
                secureTextEntry
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => router.navigate('/password-recovery')}
            >
              <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
            </TouchableOpacity>
            <View style={authStyles.context}>
              <Button text="Logar" type="confirm" onPress={handleSubmit} />
              <Button text="Cadastrar-se" type="redirect" />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareContainer>
  )
}
