import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import { colors } from '@/styles/colors'

interface StarRatingProps {
  rating: number
  size?: number
  itemId?: string | number
  onChangeRating?: (rating: number) => void // ✅ Permite interatividade
}

export function StarRating({
  rating,
  size = 32,
  itemId,
  onChangeRating,
}: StarRatingProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 10,
        alignSelf: 'flex-start',
      }}
    >
      {[...Array(5)].map((_, i) => {
        const starIndex = i + 1

        const star = (
          <MaterialIcons
            name="star"
            key={`star-${itemId ?? 'default'}-${i}`}
            color={i < rating ? colors.alert : colors.gray[300]}
            size={size}
          />
        )

        // Se a prop onChangeRating existir, torna a estrela clicável
        return onChangeRating ? (
          <TouchableOpacity
            accessibilityRole="button"
            key={starIndex}
            onPress={() => onChangeRating(starIndex)}
            testID={`star-button-${starIndex}`}
          >
            {star}
          </TouchableOpacity>
        ) : (
          <View key={starIndex}>{star}</View>
        )
      })}
    </View>
  )
}
