import { useState } from 'react'

import { MaterialIcons } from '@expo/vector-icons'
import { Text, TextInput, type TextInputProps, View } from 'react-native'

import { colors } from '@/styles/colors'
import { styles } from './styles'

type InputProps = TextInputProps & {
  icon: keyof typeof MaterialIcons.glyphMap
  isFilled: boolean
  messageError?: string
  rightIcon?: React.ReactNode;
}

export function Input({
  icon,
  isFilled = false,
  messageError,
  rightIcon,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          messageError && !isFocused && styles.inputError,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={colors.gray[400]}
        {...rest}
      />
      {/* Ícone à esquerda do input */}
      <MaterialIcons
        name={icon}
        size={20}
        style={[
          styles.icon,
          isFocused && styles.iconFocused,
          isFilled && styles.iconFilled,
          messageError && !isFocused && styles.iconError,
        ]}
      />
      {/* Ícone à direita do input */}
      {rightIcon && (
        <View style={styles.rightIcon}>
          {rightIcon}
        </View>
      )}
      {messageError && !isFocused && (
        <Text style={styles.messageError}>{messageError}</Text>
      )}
    </View>
  )
}