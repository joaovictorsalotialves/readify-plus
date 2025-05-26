import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native'
import { styles } from './styles'

type ButtonProps = TouchableOpacityProps & {
  text: string
  type?: 'confirm' | 'redirect' | 'cancel'
  isLoading?: boolean
}

export function Button({
  text,
  type = 'confirm',
  isLoading,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={[
        styles.button,
        type === 'confirm' && styles.confirm,
        type === 'redirect' && styles.redirect,
        type === 'cancel' && styles.cancel,
        rest.disabled && styles.disable,
      ]}
      activeOpacity={0.5}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator testID="loading-indicator" />
      ) : (
        <Text style={[styles.text, rest.disabled && styles.textDisable]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  )
}
