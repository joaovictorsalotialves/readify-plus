import { FlatList, Text, View } from 'react-native'

import { styles } from './styles'

import { Book } from '../book'

import type { BookData } from '@/utils/types/BookData'

type GridBooksProps = {
  title: string
  data: BookData[]
  scrollEnabled?: boolean
}

export function GridBooks({
  title,
  data,
  scrollEnabled = false,
}: GridBooksProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookContainer}>
            <Book title={item.title} />
          </View>
        )}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        scrollEnabled={scrollEnabled}
      />
    </View>
  )
}
