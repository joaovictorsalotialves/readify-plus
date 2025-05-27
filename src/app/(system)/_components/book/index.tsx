import { Image, Pressable, Text, View } from 'react-native'

import { urlApi } from '@/lib/axios'
import { router } from 'expo-router'
import { styles } from './styles'

type BookProps = {
  id: string
  title: string
  urlCover: string
}

export function Book({ id, title, urlCover }: BookProps) {
  return (
    <Pressable
      onPress={() => {
        router.navigate(`/(system)/(tabs)/detailsbook/${id}`)
      }}
    >
      <View style={styles.container}>
        <Image style={styles.cover} src={`${urlApi}/covers/${urlCover}`} />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {title}
        </Text>
      </View>
    </Pressable>
  )
}
