import { useEffect, useState } from 'react'

import { router } from 'expo-router'
import { Keyboard, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'
import { Header } from '../_components/header'

import { authStyles } from '../_styles/styles'

import { regex } from '@/utils/regex'
import { validateCode } from '@/utils/validators/validate-code'

export default function PasswordConfirmation() {
  const [code, setCode] = useState<string>('')
  const [codeError, setCodeError] = useState('')

  const [resendEmail, setResendEmail] = useState(false)

  function handleCodeChange(code: string) {
    const formattedCode = code.replace(regex.removeNonDigitsRegex, '')
    setCode(formattedCode)

    validateCode(formattedCode, setCodeError)
  }

  function handleSubmit() {
    Keyboard.dismiss()

    const isCodeValid = validateCode(code, setCodeError)

    if (isCodeValid) {
      router.navigate('/password-reset')
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setResendEmail(true)
    }, 60000)
  }, [])

  return (
    <KeyboardAwareContainer>
      <View style={authStyles.container}>
        <Header backRoute="/password-recovery" />

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
            <Text style={authStyles.description}>
              O e-mail pode levar 1 minuto para ser enviado. Caso não receba
              aperte o botão “reenviar e-mail”.
            </Text>
            <View style={authStyles.context}>
              <Button
                text="Verificar código"
                type="confirm"
                onPress={handleSubmit}
              />
              <Button
                text="Reenviar e-mail"
                type="redirect"
                onPress={() => {
                  router.replace('/password-confirmation')
                }}
                disabled={!resendEmail}
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareContainer>
  )
}
