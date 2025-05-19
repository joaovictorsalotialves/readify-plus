import { router } from 'expo-router'
import { useState } from 'react'
import { Alert, Keyboard, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'
import { Header } from '../_components/header'

import { SendEmailToRecoverPasswordService } from '@/services/sendEmailToRecoverPasswordService'
import { storageRecoveryPasswordTokenSave } from '@/storage/storageRecoveryPasswordToken'
import { validateEmail } from '@/utils/validators/validate-email'
import { AxiosError } from 'axios'
import { authStyles } from '../_styles/styles'

export default function PasswordRecovery() {
  const [isLoadingPasswordRecovery, setIsLoadingPasswordRecovery] =
    useState(false)

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  function handleEmailChange(email: string) {
    setEmail(email)
    validateEmail(email, setEmailError)
  }

  async function handleSubmit() {
    Keyboard.dismiss()

    const isValidEmail = validateEmail(email, setEmailError)

    if (isValidEmail) {
      try {
        setIsLoadingPasswordRecovery(true)
        const { recoveryPasswordToken } =
          await SendEmailToRecoverPasswordService({ email })

        if (recoveryPasswordToken) {
          storageRecoveryPasswordTokenSave({ recoveryPasswordToken })
          router.navigate('/password-confirmation')
        }
      } catch (err) {
        const isAppError = err instanceof AxiosError
        const title = isAppError
          ? err.response?.data.message
          : 'Não foi possivel enviar o email. Tente novamente'

        Alert.alert(title)
      } finally {
        setIsLoadingPasswordRecovery(false)
      }
    }
  }

  return (
    <KeyboardAwareContainer>
      <View style={authStyles.container}>
        <Header backRoute="/login" />

        <View style={authStyles.body}>
          <Text style={authStyles.title}>Recuperar Senha</Text>
          <Text style={authStyles.subtitle}>Informe seu email:</Text>

          <View style={authStyles.context}>
            <Input
              icon="mail"
              placeholder="E-mail"
              onChangeText={handleEmailChange}
              isFilled={!!email}
              messageError={emailError}
              value={email}
              autoCapitalize="none"
            />
            <View style={authStyles.context}>
              <Button
                text="Recuperar senha"
                type="confirm"
                onPress={handleSubmit}
                isLoading={isLoadingPasswordRecovery}
              />
              <Button
                text="Fazer login"
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
