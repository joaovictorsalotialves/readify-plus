import { StarRating } from '@/components/star-rating'
import type { AssessmentDTO } from '@/dtos/assessement-dto'
import { useAuth } from '@/hooks/useAuth'
import { useBook } from '@/hooks/useBook'
import { useGetBookReviewsOfBook } from '@/hooks/useGetBookReviewsOfBook'
import { removeBookReviewService } from '@/services/deleteBookReviewService'
import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'

type Props = {
  review: AssessmentDTO
}

export function ReviewCard({ review }: Props) {
  const { user } = useAuth()
  const { removeBookReview } = useBook()

  return (
    <View style={styles.container}>
      <View style={styles.reviewCard}>
        {/* FOTO + USERNAME */}
        <View style={styles.profileRow}>
          {/* <Image source={{ uri: review.avatar }} style={styles.profilePicture} /> */}
          <View style={styles.userInfo}>
            <Text style={styles.username}>{review.user.username}</Text>
          </View>
        </View>
        {/* Estrelas abaixo da imagem e do username */}
        <View style={styles.starRatingContainer}>
          <StarRating rating={review.score} size={16} itemId={review.id} />
        </View>
        {/* TÍTULO E DATA */}
        <View style={styles.reviewHeader}>
          {/* <Text style={styles.reviewUsername}>{review.title}</Text> */}
          <Text style={styles.reviewDate}>
            {new Intl.DateTimeFormat('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }).format(new Date(review.createdAt))}
          </Text>
        </View>
        {/* COMENTÁRIO */}
        <Text style={styles.reviewComment}>{review.comment}</Text>
      </View>

      {user?.id === review.userId && (
        <View style={styles.icons}>
          <TouchableOpacity
            testID="delete-button"
            onPress={() => {
              removeBookReview(review.id, user.id)
            }}
          >
            <MaterialIcons name="delete" color={colors.danger} size={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
