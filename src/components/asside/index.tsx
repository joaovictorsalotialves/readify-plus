import { MaterialIcons } from '@expo/vector-icons'
import {
  Pressable,
  type PressableProps,
  View,
  type ViewProps,
} from 'react-native'

import { colors } from '@/styles/colors'
import { styles } from './styles'

type AssideProps = ViewProps

type ContainerAssideButtonsProps = ViewProps

type AssideButtonProps = PressableProps & {
  icon: keyof typeof MaterialIcons.glyphMap
}

export function Asside({ children, style }: AssideProps) {
  return <View style={[styles.asside, style]}>{children}</View>
}

export function ContainerAssideButtons({
  children,
}: ContainerAssideButtonsProps) {
  return <View style={styles.containerButtons}>{children}</View>
}

export function AssideButton({ icon, onPress }: AssideButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress} testID="asside-button">
      <MaterialIcons name={icon} color={colors.gray[900]} size={32} />
    </Pressable>
  )
}
