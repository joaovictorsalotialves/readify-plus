import React from 'react'
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { colors } from '@/styles/colors'

interface StarRatingProps {
  rating: number
  size?: number
  itemId?: string | number
}

export function StarRating({ rating, size = 32, itemId }: StarRatingProps) {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 10, alignSelf: 'flex-start' }}>
      {[...Array(5)].map((_, i) => (
        <MaterialIcons
          key={`star-${itemId ?? 'default'}-${i}`}
          name="star"
          color={i < rating ? colors.alert : colors.gray[300]}
          size={size}
        />
      ))}
    </View>
  )
}