import { MaterialIcons } from '@expo/vector-icons'
import { Text, View } from 'react-native'

import { colors } from '@/styles/colors'
import { styles } from './styles'

type Notification = {
  title: string
  date: string
  icon: keyof typeof MaterialIcons.glyphMap
  view?: boolean
}

export function Notification({
  title,
  date,
  icon,
  view = false,
}: Notification) {
  return (
    <View style={styles.container}>
      <MaterialIcons name={icon} size={32} color={colors.gray[900]} />
      <View style={styles.context}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {title}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      {!view && <View style={styles.point} />}
    </View>
  )
}
