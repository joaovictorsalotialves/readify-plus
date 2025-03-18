import { MaterialIcons } from '@expo/vector-icons'
import { Pressable, Text, View } from 'react-native'

import { colors } from '@/styles/colors'
import styles from './styles'

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Readify Plus</Text>
      <Pressable>
        <MaterialIcons
          name="notifications"
          size={32}
          color={colors.gray[100]}
        />
      </Pressable>
    </View>
  )
}
