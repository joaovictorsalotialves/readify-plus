import { StyleSheet } from 'react-native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    marginBottom: 20,
  },
  title: {
    ...fonts.heading.lg,
    color: colors.gray[900],
  },
  content: {
    gap: 20,
    // width: '100%',
    flex: 1,
  },
  bookContainer: {
    flex: 1,
  },
})
