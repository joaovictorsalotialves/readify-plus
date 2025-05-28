import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

import { colors } from '@/styles/colors'
import { styles } from './styles'

type ResourceHeaderProps = {
  title: string
  icon: keyof typeof MaterialIcons.glyphMap
}

export function ResourceHeader({ title, icon }: ResourceHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()} testID="back-button">
        <MaterialIcons name={icon} size={32} color={colors.gray[900]} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}
