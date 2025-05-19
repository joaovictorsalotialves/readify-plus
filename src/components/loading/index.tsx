import { ActivityIndicator, Image, View } from 'react-native'

import { colors } from '@/styles/colors'
import { styles } from './styles'

export function Loading() {
  return (
    <View style={styles.container} testID="loading-indicator">
      <Image source={require('@/assets/logo_small.png')} />
      <ActivityIndicator size="large" color={colors.gray[100]} />
    </View>
  )
}
