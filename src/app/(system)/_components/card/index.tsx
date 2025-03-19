import { Text, View } from 'react-native'

import styles from './styles'

type CardProps = {
  info: string
  label: string
}

export default function Card({ info, label }: CardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.info}>{info}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}
