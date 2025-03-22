import { FlatList, Text, View } from 'react-native'

import { styles } from './styles'

import { Book } from '../book'

import type { BookData } from '@/utils/types/BookData'

type FeaturedBooksProps = {
  title: string
  data: BookData[]
}

export function FeaturedBooks({ title, data }: FeaturedBooksProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Book title={item.title} />}
        contentContainerStyle={styles.slider}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  )
}
