import { styles } from '@/app/(system)/(tabs)/detailsbook/styles'
import { colors } from '@/styles/colors'
import type { CommentData } from '@/utils/types/CommentData'
import { MaterialIcons } from '@expo/vector-icons'
import React, { useCallback, useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { FeaturedBooks } from '../../../../components/featured-books'
import { NavigationHeader } from '../../../../components/navigation-header'
import { StarRating } from '../../../../components/star-rating'
import { StatItem } from '../../../../components/stat-item'
import { ReviewCard } from '../../_components/review-card'

import { Loading } from '@/components/loading'
import { useAuth } from '@/hooks/useAuth'
import { useBook } from '@/hooks/useBook'
import { useRecommendBooks } from '@/hooks/useRecommendBooks'
import { useSimilarBooks } from '@/hooks/useSimilarBooks'
import { urlApi } from '@/lib/axios'

import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'

export default function BookDetailsScreen() {
  const { isLoading, auth } = useAuth()
  const { isLoadingBook, book, isFavorite, getBook, toggleFavorite } = useBook()
  const { isLoadingRecommendBooks, recommendBooks, getRecommendBooks } =
    useRecommendBooks()
  const { isLoadingSimilarBooks, similarBooks, getSimilarBooks } =
    useSimilarBooks()

  const [currentReviewPage, setCurrentReviewPage] = useState(1)

  const reviewsPerPage = 1

  const { id } = useLocalSearchParams()

  useFocusEffect(
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useCallback(() => {
      auth()
      if (typeof id === 'string') {
        getBook(id)
        getSimilarBooks(id)
      }
      getRecommendBooks()
    }, [id])
  )

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
          <TouchableOpacity
            style={styles.readButton}
            onPress={() => {
              router.navigate(`/(system)/(reading)/read/${book.id}`)
            }}
          >
            <Text style={styles.readButtonText}>Ler Livro</Text>
          </TouchableOpacity>
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

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Avaliações ({book.assessements})
          </Text>
          {reviews
            .slice(
              (currentReviewPage - 1) * reviewsPerPage,
              currentReviewPage * reviewsPerPage
            )
            .map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 12,
            }}
          >
            {Array.from({ length: maxPages }).map((_, index) => {
              const pageNumber = index + 1
              const isActive = currentReviewPage === pageNumber

              return (
                <TouchableOpacity
                  key={`page-${pageNumber}`}
                  onPress={() => setCurrentReviewPage(pageNumber)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    marginHorizontal: 4,
                    borderRadius: 8,
                    backgroundColor: isActive
                      ? colors.orange[500]
                      : colors.gray[300],
                  }}
                >
                  <Text
                    style={{
                      color: isActive ? 'black' : colors.gray[800],
                      fontWeight: 'bold',
                    }}
                  >
                    {pageNumber}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View> */}

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
