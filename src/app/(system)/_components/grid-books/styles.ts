import { StyleSheet } from 'react-native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  title: {
    ...fonts.heading.lg,
    color: colors.gray[900],
  },
  slider: {
    gap: 20,
  },
  bookContainer: {
    flex: 1, 
  },
})
