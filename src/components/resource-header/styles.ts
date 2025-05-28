import { StyleSheet } from 'react-native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray[300],
    padding: 20,
    gap: 12,
  },
  title: {
    ...fonts.heading.xl,
    color: colors.gray[900],
  },
})
