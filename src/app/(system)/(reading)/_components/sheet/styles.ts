import { StyleSheet } from 'react-native'

import { colors } from '@/styles/colors'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray[100],
    borderWidth: 0.5,
    borderColor: colors.gray[300],
  },
  indicator: {
    width: 80,
    height: 4,
    backgroundColor: colors.gray[300],
  },
  content: {
    gap: 12,
  },
})
