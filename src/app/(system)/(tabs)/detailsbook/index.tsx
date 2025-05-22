import { styles } from '@/app/(system)/(tabs)/detailsbook/styles'
import { colors } from '@/styles/colors'
import { books } from '@/utils/mocks/books'
import type { CommentData } from '@/utils/types/CommentData'
import { MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { FeaturedBooks } from '../../_components/featured-books'
import { NavigationHeader } from '../../_components/navigation-header'
import { ReviewCard } from '../../_components/review-card'
import { StarRating } from '../../_components/star-rating'
import { StatItem } from '../../_components/stat-item'

import { Loading } from '@/components/loading'
import { useBook } from '@/hooks/useBook'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

type RootStackParamList = {
  Leitor: { bookId: string }
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Leitor'>

export default function BookDetailsScreen() {
  const { isLoadingBook, book, getBook } = useBook()
  const navigation = useNavigation<NavigationProp>()
  const [currentReviewPage, setCurrentReviewPage] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const reviewsPerPage = 1

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getBook('d7b20311-663f-4bca-bb17-47bc7f20ff82')
  }, [])

  if (isLoadingBook) return <Loading />

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
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.readButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const handleReadPress = () => {
    navigation.navigate('Leitor', { bookId: book.id })
  }

  const handleLikePress = () => {
    setIsLiked(prev => !prev)
  }

  const reviews: CommentData[] = [
    {
      id: '1',
      username: 'LeitorAssíduo',
      date: '27 de novembro 2022',
      comment: 'Uma obra-prima da literatura mundial!',
      title: book.title,
      cover: book.urlCover,
      rating: 4.5,
      avatar: 'https://via.placeholder.com/50.png?text=A1',
    },
    {
      id: '2',
      username: 'CríticoLiterário',
      date: '15 de janeiro 2023',
      comment: 'Narrativa rica e personagens inesquecíveis.',
      title: book.title,
      cover: book.urlCover,
      rating: 4.8,
      avatar: 'https://via.placeholder.com/50.png?text=A2',
    },
    {
      id: '3',
      username: 'MariaLuz',
      date: '10 de março 2023',
      comment: 'Muito interessante, mas um pouco longo pra mim.',
      title: book.title,
      cover: book.urlCover,
      rating: 4.0,
      avatar: 'https://via.placeholder.com/50.png?text=A3',
    },
    {
      id: '4',
      username: 'JoãoCultura',
      date: '21 de abril 2023',
      comment: 'Simplesmente genial! Leitura obrigatória.',
      title: book.title,
      cover: book.urlCover,
      rating: 5.0,
      avatar: 'https://via.placeholder.com/50.png?text=A4',
    },
  ]

  const maxPages = Math.ceil(reviews.length / reviewsPerPage)

  return (
    <View style={styles.container}>
      <NavigationHeader />

      <View style={styles.customHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.gray[800]} />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {book.title}
        </Text>

        <TouchableOpacity
          testID="favorite-button"
          style={styles.likeButton}
          onPress={handleLikePress}
          accessibilityLabel="favorite-button"
        >
          <MaterialIcons
            name={isLiked ? 'favorite' : 'favorite-border'}
            size={24}
            color={isLiked ? colors.alert : colors.gray[800]}
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
              source={{ uri: book.urlCover }}
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
            <StarRating rating={4} />
          </View>
        </View>

        <View style={styles.readSection}>
          <TouchableOpacity style={styles.readButton} onPress={handleReadPress}>
            <Text style={styles.readButtonText}>Ler Livro</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <StatItem label="Nº Leituras" value={100} />
          <StatItem label="Nº Avaliações" value={100} />
          <StatItem label="Nº Visitas" value={book.visits} />
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
          <Text style={styles.sectionTitle}>Avaliações (100)</Text>
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
        </View>

        <View style={styles.section}>
          <View style={styles.contextGallery}>
            <FeaturedBooks
              title="Recomendados para você"
              data={books.slice(0, 3)}
            />
            <FeaturedBooks title="Títulos Semelhantes" data={books} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
