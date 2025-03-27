import { MaterialIcons } from '@expo/vector-icons'
import { Pressable, View, type ViewProps } from 'react-native'

import { colors } from '@/styles/colors'
import { styles } from './styles'

type AssideProps = ViewProps

type ContainerAssideButtonsProps = ViewProps

type AssideButtonProps = {
  icon: keyof typeof MaterialIcons.glyphMap
}

export function Asside({ children }: AssideProps) {
  return <View style={styles.asside}>{children}</View>
}

export function ContainerAssideButtons({
  children,
}: ContainerAssideButtonsProps) {
  return <View style={styles.containerButtons}>{children}</View>
}

export function AssideButton({ icon }: AssideButtonProps) {
  return (
    <Pressable style={styles.button}>
      <MaterialIcons name={icon} color={colors.gray[900]} size={32} />
    </Pressable>
  )
}
