import { useEffect } from 'react'

import { ScrollView, View } from 'react-native'

import { Loading } from '@/components/loading'
import { Card } from '../../_components/card'
import { FeaturedBooks } from '../../_components/featured-books'
import { NavigationHeader } from '../../_components/navigation-header'

import { systemStyles } from '../../_styles/styles'
import { styles } from './styles'

import { useAuth } from '@/hooks/useAuth'
import { useBooksIsReading } from '@/hooks/useBooksIsReading'
import { useCountBooksRead } from '@/hooks/useCountBooksRead'

import { useCountBookReview } from '@/hooks/useCountBookReview'
import { books } from '@/utils/mocks/books'

export default function Home() {
  const { isLoading, auth } = useAuth()
  const { isLoadingBooksIsReading, booksIsReading, getBooksIsReading } =
    useBooksIsReading()
  const { isLoadingCountBooksRead, countBooksRead, getCountBooksRead } =
    useCountBooksRead()
  const { isLoadingCountBookReview, countBookReview, getCountBookReview } =
    useCountBookReview()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    auth()
    getBooksIsReading()
    getCountBooksRead()
    getCountBookReview()
  }, [])

  if (
    isLoading &&
    isLoadingBooksIsReading &&
    isLoadingCountBooksRead &&
    isLoadingCountBookReview
  ) {
    return <Loading />
  }

  return (
    <View style={systemStyles.container}>
      <NavigationHeader />

      <View style={styles.body}>
        <View style={styles.context}>
          <Card
            info={countBooksRead.toString()}
            label="Quantidade de livros lidas"
          />
          <Card
            info={countBookReview.toString()}
            label="Quantidade de comentários"
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contextGallery}>
            <FeaturedBooks title="Continuar lendo" data={booksIsReading} />
            <FeaturedBooks title="Sugestões de leitura" data={books} />
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
