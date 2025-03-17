import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native'
import { styles } from './styles'

type ButtonProps = TouchableOpacityProps & {
  text: string
  type?: 'confirm' | 'redirect' | 'cancel'
}

export function Button({ text, type = 'confirm', ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'confirm' && styles.confirm,
        type === 'redirect' && styles.redirect,
        type === 'cancel' && styles.cancel,
        rest.disabled && styles.disable,
      ]}
      activeOpacity={0.5}
      {...rest}
    >
      <Text style={[styles.text, rest.disabled && styles.textDisable]}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}
