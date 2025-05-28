import { FlatList, Text, View } from 'react-native'

import { styles } from './styles'

import { Book } from '../../../../components/book'

import type { BooksDTO } from '@/dtos/book-dto'

type FeaturedBooksProps = {
  title: string
  data: BooksDTO[]
}

export function FeaturedBooks({ title, data }: FeaturedBooksProps) {
  return (
    data.length > 0 && (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Book id={item.id} title={item.title} urlCover={item.urlCover} />
          )}
          contentContainerStyle={styles.slider}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
    )
  )
}
