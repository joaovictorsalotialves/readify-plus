import { useEffect, useState } from 'react'

import { router } from 'expo-router'
import { Text, View } from 'react-native'

import authStyles from '../_styles/styles'
import styles from './styles'

import { regex } from '@/utils/regex'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Header } from '../_components/header'

export default function PasswordConfirmation() {
  const [code, setCode] = useState<string>('')
  const [codeError, setCodeError] = useState('')

  const [resendEmail, setResendEmail] = useState(false)

  function validateCode(value: string) {
    if (!value) return setCodeError('Código vazio!')

    if (!regex.codeRegex.test(value))
      return setCodeError('Formato do código inválido!')

    setCodeError('')
  }

  function handleCode(value: string) {
    const formattedCode = value.replace(regex.numberRegex, '')
    setCode(formattedCode)

    validateCode(formattedCode)
  }

  useEffect(() => {
    setTimeout(() => {
      setResendEmail(true)
    }, 60000)
  }, [])

  return (
    <View style={authStyles.container}>
      <Header backRoute="/password-recovery" />

      <View style={authStyles.body}>
        <Text style={authStyles.title}>Recuperar Senha</Text>
        <Text style={styles.subtitle}>
          Informe o código enviado em seu e-mail:
        </Text>
        <View style={authStyles.context}>
          <Input
            icon="pin"
            placeholder="Código"
            onChangeText={handleCode}
            value={code}
            isFilled={!!code}
            messageError={codeError}
            keyboardType="numeric"
            inputMode="numeric"
            maxLength={6}
          />
          <Text style={styles.description}>
            O e-mail pode levar 1 minuto para ser enviado. Caso não receba
            aperte o botão “reenviar e-mail”.
          </Text>
          <View style={authStyles.context}>
            <Button
              text="Verificar código"
              type="confirm"
              onPress={() => {
                validateCode(code)
              }}
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
  )
}
