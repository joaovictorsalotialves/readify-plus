import { Image, Text, View } from 'react-native'

import { styles } from './styles'

type BookProps = {
  title: string
}

export function Book({ title }: BookProps) {
  return (
    <View style={styles.container}>
      <Image style={styles.cover} />
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
        {title}
      </Text>
    </View>
  )
}
