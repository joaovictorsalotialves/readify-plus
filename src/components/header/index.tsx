import { MaterialIcons } from '@expo/vector-icons'
import { type RelativePathString, router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

import { colors } from '@/styles/colors'
import { styles } from './styles'

type HeaderProps = {
  backRoute: `/${string}`
}

export function Header({ backRoute }: HeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID="back-button"
        activeOpacity={0.5}
        onPress={() => {
          router.navigate(backRoute as RelativePathString)
        }}
      >
        <MaterialIcons name="arrow-back" size={68} color={colors.gray[100]} />
      </TouchableOpacity>
      <Text style={styles.logo}>Readify Plus</Text>
    </View>
  )
}
