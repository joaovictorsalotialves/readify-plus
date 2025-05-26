import { FlatList, Text, View } from 'react-native'

import { Book } from '../book'
import { styles } from './styles'

import type { BooksDTO } from '@/dtos/book-dto'

type GridBooksProps = {
  title: string
  data: BooksDTO[]
  scrollEnabled?: boolean
}

export function GridBooks({
  title,
  data,
  scrollEnabled = false,
}: GridBooksProps) {
  // Garante múltiplos de 3
  const filledData = [...data]
  const remainder = data.length % 3
  if (remainder !== 0) {
    for (let i = 0; i < 3 - remainder; i++) {
      filledData.push({
        id: `placeholder-${i}`,
        title: '',
        urlCover: '',
        bookPath: '',
        synopsis: '',
        publisher: '',
        numberPage: 0,
        language: '',
        ISBN: '',
        visits: 0,
        score: 0,
        favorite: 0,
        assessements: 0,
        read: 0,
        writer: { id: '', name: '' },
        category: { id: '', name: '' },
        isPlaceholder: true,
      } as BooksDTO & { isPlaceholder: boolean })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={filledData}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          'isPlaceholder' in item ? (
            <View style={[styles.bookContainer, { opacity: 0 }]} />
          ) : (
            <View style={styles.bookContainer}>
              <Book id={item.id} title={item.title} urlCover={item.urlCover} />
            </View>
          )
        }
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        scrollEnabled={scrollEnabled}
      />
    </View>
  )
}
