import { StyleSheet } from 'react-native'

import { colors } from '@/styles/colors'

export const styles = StyleSheet.create({
  pagination: {
    textAlign: 'right',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  container: {
    backgroundColor: colors.gray[100],
    borderWidth: 0.2,
    borderColor: colors.gray[300],
  },
  indicator: {
    width: 80,
    height: 4,
    backgroundColor: colors.gray[300],
  },
})
