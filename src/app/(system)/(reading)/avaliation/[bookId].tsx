import React, { useCallback, useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { ResourceHeader } from '../../../../components/resource-header'
import { StarRating } from '../../../../components/star-rating'

import {
  Redirect,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from 'expo-router'
import { systemStyles } from '../../_styles/styles'
import { styles } from './styles'

import { Loading } from '@/components/loading'
import { useAuth } from '@/hooks/useAuth'
import { useBook } from '@/hooks/useBook'
import { useCreateBookReview } from '@/hooks/useCreateBookReview'

export default function Home() {
  const { auth, user, isLoading } = useAuth()
  const { book, isLoadingBook, getBook } = useBook()
  const { createBookReview, isLoadingCreateBookReview } = useCreateBookReview()

  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)

  const { bookId } = useLocalSearchParams()

  const handleSubmit = async () => {
    try {
      await createBookReview(rating, comment, book.id)
      return router.back()
    } catch (err) {
      Alert.alert('Erro ao enviar a avaliação')
    }
  }

  useFocusEffect(
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useCallback(() => {
      auth()
      if (typeof bookId === 'string') {
        getBook(bookId)
      }
    }, [bookId])
  )

  if (isLoading || isLoadingBook) {
    return <Loading />
  }

  if (!user) {
    return <Redirect href={'/(auth)/login'} />
  }

  return (
    <View style={systemStyles.container}>
      <ResourceHeader title={`Avaliação: ${book.title}`} icon="arrow-back" />

      <View style={styles.customHeader}>
        <Text style={styles.linkLabel}>Qual nota você avaliaria o livro</Text>
        <StarRating rating={rating} onChangeRating={setRating} />
      </View>

      <View style={styles.customHeader}>
        <Text style={styles.linkLabel}>Comentário (opcional)</Text>
        <TextInput
          value={comment}
          onChangeText={setComment}
          placeholder="Comentário..."
          multiline
          style={styles.textArea}
        />
      </View>

      <View style={styles.readSection}>
        <TouchableOpacity style={styles.readButton} onPress={handleSubmit}>
          <Text style={styles.readButtonText}>Enviar Comentário</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
