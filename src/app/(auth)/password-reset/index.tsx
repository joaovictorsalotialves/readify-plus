import { useEffect, useState } from 'react'

import { router } from 'expo-router'
import { Alert, Keyboard, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { AuthHeader } from '../../../components/auth-header'

import { authStyles } from '../_styles/styles'

import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'
import { ResetPasswordService } from '@/services/resetPasswordService'
import { storageAuthTokenSave } from '@/storage/storageAuthToken'
import { storageResetPasswordTokenGet } from '@/storage/storageResetPasswordToken'
import validadeConfirmationPassword from '@/utils/validators/validate-confirmationPassword'
import validadeNewPassword from '@/utils/validators/validate-newPassword'
import { AxiosError } from 'axios'

export default function PasswordReset() {
  const [isLoadingPasswordReset, setIsLoadingPasswordReset] = useState(false)

  const [newPassword, setNewPassword] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')

  const [confirmationPassword, setConfirmationPassword] = useState('')
  const [confirmationPasswordError, setConfirmationPasswordError] = useState('')

  const [resetPasswordToken, setResetPasswordToken] = useState('')

  async function checkPasswordRecoveryToken() {
    try {
      const { resetPasswordToken } = await storageResetPasswordTokenGet()

      if (!resetPasswordToken) {
        return router.navigate('/password-recovery')
      }
      setResetPasswordToken(resetPasswordToken)
    } catch (err) {
      Alert.alert('Falha com o token de resetar a senha!')
    }
  }

  function handleNewPasswordChange(newPassword: string) {
    setNewPassword(newPassword)
    validadeNewPassword(newPassword, setNewPasswordError)
    validadeConfirmationPassword(
      confirmationPassword,
      newPassword,
      setConfirmationPasswordError
    )
  }

  function handleConfirmationPasswordChange(confirmationPassword: string) {
    setConfirmationPassword(confirmationPassword)
    validadeConfirmationPassword(
      confirmationPassword,
      newPassword,
      setConfirmationPasswordError
    )
  }

  async function handleSubmit() {
    Keyboard.dismiss()

    const isValidNewPassword = validadeNewPassword(
      newPassword,
      setNewPasswordError
    )
    const isValidConfirmationPassword = validadeConfirmationPassword(
      confirmationPassword,
      newPassword,
      setConfirmationPasswordError
    )

    if (isValidNewPassword && isValidConfirmationPassword) {
      try {
        setIsLoadingPasswordReset(true)
        const { token, refreshToken } = await ResetPasswordService({
          password: newPassword,
          passwordConfirmation: confirmationPassword,
          resetPasswordToken,
        })
        await storageAuthTokenSave({ token, refreshToken })
        router.replace('/(system)/(tabs)/home')
      } catch (err) {
        const isAppError = err instanceof AxiosError
        const title = isAppError
          ? err.response?.data.message
          : 'Não foi possível alterar a senha! Tente novamente'

        Alert.alert(title)
      } finally {
        setIsLoadingPasswordReset(false)
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
          <Text style={authStyles.subtitle}>Informe uma nova senha:</Text>
          <View style={authStyles.context}>
            <Input
              icon="lock"
              placeholder="Nova senha"
              onChangeText={handleNewPasswordChange}
              isFilled={!!newPassword}
              messageError={newPasswordError}
              autoCapitalize="none"
              value={newPassword}
              secureTextEntry
            />
            <Input
              icon="lock"
              placeholder="Confirmar senha"
              onChangeText={handleConfirmationPasswordChange}
              isFilled={!!confirmationPassword}
              messageError={confirmationPasswordError}
              autoCapitalize="none"
              value={confirmationPassword}
              secureTextEntry
            />
          </View>
          <View style={authStyles.context}>
            <Button
              text="Redefinir senha"
              type="confirm"
              onPress={handleSubmit}
              isLoading={isLoadingPasswordReset}
            />
          </View>
        </View>
      </View>
    </KeyboardAwareContainer>
  )
}
