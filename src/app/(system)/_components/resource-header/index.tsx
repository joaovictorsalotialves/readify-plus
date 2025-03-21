import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

import { colors } from '@/styles/colors'
import { styles } from './styles'

type ResourceHeaderProps = {
  title: string
}

export default function ResourceHeader({ title }: ResourceHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()}>
        <MaterialIcons name="close" size={32} color={colors.gray[900]} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}
