import { styles } from '@/app/(system)/(tabs)/detailsbook/styles'
import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import React, { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { FeaturedBooks } from '../../../../components/featured-books'
import { NavigationHeader } from '../../../../components/navigation-header'
import { ReviewCard } from '../../../../components/review-card'
import { StarRating } from '../../../../components/star-rating'
import { StatItem } from '../../../../components/stat-item'

import { Loading } from '@/components/loading'
import { useAuth } from '@/hooks/useAuth'
import { useBook } from '@/hooks/useBook'
import { useRecommendBooks } from '@/hooks/useRecommendBooks'
import { useSimilarBooks } from '@/hooks/useSimilarBooks'
import { urlApi } from '@/lib/axios'

import { Button } from '@/components/button'
import { useGetBookReviewsOfBook } from '@/hooks/useGetBookReviewsOfBook'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'

export default function BookDetailsScreen() {
  const { isLoading, auth } = useAuth()
  const {
    isLoadingBook,
    book,
    isFavorite,
    getBook,
    toggleFavorite,
    removeBookReview,
  } = useBook()
  const { isLoadingRecommendBooks, recommendBooks, getRecommendBooks } =
    useRecommendBooks()
  const { isLoadingSimilarBooks, similarBooks, getSimilarBooks } =
    useSimilarBooks()
  const { assessements, getBookReviewsOfBook } = useGetBookReviewsOfBook()

  const [currentReviewPage, setCurrentReviewPage] = useState(1)
  const reviewsPerPage = 3

  const { id } = useLocalSearchParams()

  useFocusEffect(
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useCallback(() => {
      auth()
      if (typeof id === 'string') {
        getBook(id)
        getSimilarBooks(id)
        getBookReviewsOfBook(id)
      }
      getRecommendBooks()
    }, [id])
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (typeof id === 'string') {
      getBookReviewsOfBook(id)
    }
  }, [removeBookReview])

  if (
    isLoading ||
    isLoadingBook ||
    isLoadingRecommendBooks ||
    isLoadingSimilarBooks
  ) {
    return <Loading />
  }

  if (!book) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Text style={{ fontSize: 16 }}>Livro não encontrado.</Text>
        <TouchableOpacity
          style={styles.readButton}
          onPress={() => router.back()}
        >
          <Text style={styles.readButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <NavigationHeader />

      <View style={styles.customHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.gray[800]} />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {book.title}
        </Text>

        <TouchableOpacity
          testID="favorite-button"
          style={styles.likeButton}
          onPress={toggleFavorite}
          accessibilityLabel="favorite-button"
        >
          <MaterialIcons
            testID="favorite-button"
            name={isFavorite ? 'favorite' : 'favorite-border'}
            size={24}
            color={isFavorite ? colors.danger : colors.gray[800]}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.coverContainer}>
          {!!book.urlCover && (
            <Image
              source={{ uri: `${urlApi}/covers/${book.urlCover}` }}
              style={styles.bookCover}
              resizeMode="cover"
            />
          )}

          <View style={styles.bookInfo}>
            <Text style={styles.label}>Título Livro</Text>
            <Text style={styles.value}>{book.title}</Text>

            <Text style={styles.label}>Nome Escritor</Text>
            <Text style={styles.value}>{book.writer.name}</Text>

            <Text style={styles.label}>Avaliação</Text>
            <StarRating rating={book.score} />
          </View>
        </View>

        <View style={styles.readSection}>
          <Button
            text="Ler Livro"
            onPress={() => {
              router.navigate(`/(system)/(reading)/read/${book.id}`)
            }}
          />
          <Button
            text="Fazer avaliação do Livro"
            type="redirect"
            onPress={() => {
              router.navigate(`/(system)/(reading)/avaliation/${book.id}`)
            }}
          />
        </View>

        <View style={styles.statsGrid}>
          <StatItem label="Nº Leituras" value={book.read} />
          <StatItem label="Nº Avaliações" value={book.assessements} />
          <StatItem label="Nº Visitas" value={book.visits} />
          <StatItem label="Nº Favoritos" value={book.favorite} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações sobre o Livro</Text>
          <Text style={styles.label}>Sinopse</Text>
          <Text style={styles.bookDescription}>{book.synopsis}</Text>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Gênero: </Text>
              {book.category.name}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Editora: </Text>
              {book.publisher}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Nº Páginas: </Text>
              {book.numberPage}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Idiomas: </Text>
              {book.language}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>ISBN: </Text>
              {book.ISBN}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Avaliações ({book.assessements})
          </Text>

          {assessements && (
            <>
              <FlatList
                scrollEnabled={false}
                data={assessements.slice(
                  (currentReviewPage - 1) * reviewsPerPage,
                  currentReviewPage * reviewsPerPage
                )}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ReviewCard review={item} />}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 12,
                }}
              >
                <TouchableOpacity
                  disabled={currentReviewPage === 1}
                  onPress={() =>
                    setCurrentReviewPage(prev => Math.max(prev - 1, 1))
                  }
                >
                  <Text
                    style={{
                      color:
                        currentReviewPage === 1
                          ? colors.gray[500]
                          : colors.blue,
                    }}
                  >
                    Página anterior
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={
                    currentReviewPage * reviewsPerPage >= assessements.length
                  }
                  onPress={() => setCurrentReviewPage(prev => prev + 1)}
                >
                  <Text
                    style={{
                      color:
                        currentReviewPage * reviewsPerPage >=
                        assessements.length
                          ? colors.gray[500]
                          : colors.blue,
                    }}
                  >
                    Próxima página
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.contextGallery}>
            <FeaturedBooks
              title="Recomendados para você"
              data={recommendBooks}
            />
            <FeaturedBooks title="Títulos Semelhantes" data={similarBooks} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
