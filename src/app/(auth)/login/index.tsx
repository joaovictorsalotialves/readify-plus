import { useState } from 'react'

import { router } from 'expo-router'
import {
  Alert,
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'

import { authStyles } from '../_styles/styles'
import { styles } from './styles'

import { validateEmail } from '@/utils/validators/validate-email'
import { validatePassword } from '@/utils/validators/validate-password'

import { Loading } from '@/components/loading'
import { useAuth } from '@/hooks/useAuth'
import { AxiosError } from 'axios'

export default function Login() {
  const { login } = useAuth()
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)

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

  async function handleSubmit() {
    Keyboard.dismiss()

    const isValidEmail = validateEmail(email, setEmailError)
    const isValidPassword = validatePassword(password, setPasswordError)

    if (isValidEmail && isValidPassword) {
      try {
        setIsLoadingLogin(true)
        await login(email, password)

        router.replace('/(system)/(tabs)/home')
      } catch (err) {
        const isAppError = err instanceof AxiosError
        const title =
          isAppError && err.response?.data.message
            ? err.response.data.message
            : 'Não foi possivel entrar. Tente novamente'

        Alert.alert(title)
      } finally {
        setIsLoadingLogin(false)
      }
    }
  }

  if (isLoadingLogin) {
    return <Loading />
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
                value={email}
              />
              <Input
                icon="lock"
                placeholder="Senha"
                onChangeText={handlePasswordChange}
                isFilled={!!password}
                messageError={passwordError}
                autoCapitalize="none"
                value={password}
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
              <Button
                text="Logar"
                type="confirm"
                onPress={handleSubmit}
                isLoading={isLoadingLogin}
              />
              <Button
                text="Cadastrar-se"
                type="redirect"
                onPress={() => {
                  router.navigate('/register-user')
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareContainer>
  )
}
