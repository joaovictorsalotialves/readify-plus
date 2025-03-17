import { useState } from 'react'

import { router } from 'expo-router'
import { Keyboard, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Header } from '../_components/header'

import authStyles from '../_styles/styles'
import styles from './styles'

import validadeConfirmationPassword from '@/utils/validators/validade-confirmationPassword'
import validadeNewPassword from '@/utils/validators/validade-newPassword'

export default function PasswordReset() {
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')

  const [confirmationPassword, setConfirmationPassword] = useState('')
  const [confirmationPasswordError, setConfirmationPasswordError] = useState('')

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

  function handleSubmit() {
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

    if (isValidNewPassword || isValidConfirmationPassword) {
      router.navigate('/login')
    }
  }

  return (
    <View style={authStyles.container}>
      <Header backRoute="/password-recovery" />
      <View style={authStyles.body}>
        <Text style={authStyles.title}>Recuperar Senha</Text>
        <Text style={styles.subtitle}>Informe uma nova senha:</Text>
        <View style={authStyles.context}>
          <Input
            icon="lock"
            placeholder="Nova senha"
            onChangeText={handleNewPasswordChange}
            isFilled={!!newPassword}
            messageError={newPasswordError}
            autoCapitalize="none"
            secureTextEntry
          />
          <Input
            icon="lock"
            placeholder="Confirmar senha"
            onChangeText={handleConfirmationPasswordChange}
            isFilled={!!confirmationPassword}
            messageError={confirmationPasswordError}
            autoCapitalize="none"
            secureTextEntry
          />
        </View>
        <View style={authStyles.context}>
          <Button
            text="Redefinir senha"
            type="confirm"
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  )
}
