import { MaterialIcons } from '@expo/vector-icons'
import { Pressable, Text, View } from 'react-native'

import { colors } from '@/styles/colors'
import Header from '../_components/header'
import styles from './styles'

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  )
}
