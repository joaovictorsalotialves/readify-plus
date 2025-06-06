import { useEffect, useState } from 'react'

import { router } from 'expo-router'
import { Alert, Keyboard, Text, View } from 'react-native'

import { AuthHeader } from '@/components/auth-header'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'

import { authStyles } from '../_styles/styles'

import { ValidateRecoverPasswordCodeService } from '@/services/validateRecoveryPasswordCodeService'
import { storageRecoveryPasswordTokenGet } from '@/storage/storageRecoveryPasswordToken'
import { storageResetPasswordTokenSave } from '@/storage/storageResetPasswordToken'
import { regex } from '@/utils/regex'
import { validateCode } from '@/utils/validators/validate-code'
import { AxiosError } from 'axios'

export default function PasswordConfirmation() {
  const [isLoadingPasswordConfirmation, setIsLoadingPasswordConfirmation] =
    useState(false)

  const [code, setCode] = useState<string>('')
  const [codeError, setCodeError] = useState('')

  const [recoveryPasswordToken, setRecoveryPasswordToken] = useState('')

  async function checkPasswordRecoveryToken() {
    try {
      const { recoveryPasswordToken } = await storageRecoveryPasswordTokenGet()

      if (!recoveryPasswordToken) {
        return router.navigate('/password-recovery')
      }
      setRecoveryPasswordToken(recoveryPasswordToken)
    } catch (err) {
      Alert.alert('Falha com o token de recuperação de senha!')
    }
  }

  function handleCodeChange(code: string) {
    const formattedCode = code.replace(regex.removeNonDigitsRegex, '')
    setCode(formattedCode)

    validateCode(formattedCode, setCodeError)
  }

  async function handleSubmit() {
    Keyboard.dismiss()

    const isCodeValid = validateCode(code, setCodeError)

    if (isCodeValid) {
      try {
        setIsLoadingPasswordConfirmation(true)
        const { resetPasswordToken } = await ValidateRecoverPasswordCodeService(
          { passwordRecoveryCode: code, recoveryPasswordToken }
        )

        if (resetPasswordToken) {
          storageResetPasswordTokenSave({ resetPasswordToken })
          router.navigate('/password-reset')
        }
      } catch (err) {
        const isAppError = err instanceof AxiosError
        const title = isAppError
          ? err.response?.data.message
          : 'Falha ao confirmar o código de recuperação de senha. Tente novamente'

        Alert.alert(title)
      } finally {
        setIsLoadingPasswordConfirmation(false)
      }
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    checkPasswordRecoveryToken()
  }, [])

  return (
    <KeyboardAwareContainer>
      <View style={authStyles.container}>
        <AuthHeader backRoute="/password-recovery" />

        <View style={authStyles.body}>
          <Text style={authStyles.title}>Recuperar Senha</Text>
          <Text style={authStyles.subtitle}>
            Informe o código enviado em seu e-mail:
          </Text>
          <View style={authStyles.context}>
            <Input
              icon="pin"
              placeholder="Código"
              onChangeText={handleCodeChange}
              value={code}
              isFilled={!!code}
              messageError={codeError}
              keyboardType="numeric"
              inputMode="numeric"
              maxLength={6}
            />
            <View style={authStyles.context}>
              <Button
                text="Verificar código"
                type="confirm"
                onPress={handleSubmit}
                isLoading={isLoadingPasswordConfirmation}
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareContainer>
  )
}
