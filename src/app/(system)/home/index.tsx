import { View } from 'react-native'

import styles from './styles'

import Card from '../_components/card'
import Header from '../_components/header'

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.body}>
        <View style={styles.context}>
          <Card info="20" label="Quantidade de livros lidas em 2025" />
          <Card info="12" label="Quantidade de comentários em 2025" />
        </View>
      </View>
    </View>
  )
}
function createBottomTabNavigator() {
  throw new Error('Function not implemented.')
}
