import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

import { colors } from '@/styles/colors'
import { styles } from './styles'

export function NavigationHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Readify Plus</Text>
      <Pressable onPress={() => {}}>
        <MaterialIcons
          name="settings"
          size={32}
          color={colors.gray[100]}
        />
      </Pressable>
    </View>
  )
}
