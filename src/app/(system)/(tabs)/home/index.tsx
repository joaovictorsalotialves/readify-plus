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
import { useRecommendBooks } from '@/hooks/useRecommendBooks'
import { books } from '@/utils/mocks/books'
import { Redirect } from 'expo-router'

export default function Home() {
  const { isLoading, user, auth } = useAuth()
  const { isLoadingBooksIsReading, booksIsReading, getBooksIsReading } =
    useBooksIsReading()
  const { isLoadingRecommendBooks, recommendBooks, getRecommendBooks } =
    useRecommendBooks()
  const { isLoadingCountBooksRead, countBooksRead, getCountBooksRead } =
    useCountBooksRead()
  const { isLoadingCountBookReview, countBookReview, getCountBookReview } =
    useCountBookReview()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    auth()
    getBooksIsReading()
    getRecommendBooks()
    getCountBooksRead()
    getCountBookReview()
  }, [])

  if (
    isLoading &&
    isLoadingBooksIsReading &&
    isLoadingCountBooksRead &&
    isLoadingCountBookReview &&
    isLoadingRecommendBooks
  ) {
    return <Loading />
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />
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
            <FeaturedBooks title="Sugestões de leitura" data={recommendBooks} />
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
