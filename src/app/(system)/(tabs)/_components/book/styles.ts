import { StyleSheet } from 'react-native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 100,
  },
  cover: {
    height: 120,
    width: 90,
    borderRadius: 10,
    backgroundColor: colors.gray[300],
  },
  title: {
    ...fonts.heading.subtitleSm,
    color: colors.gray[900],
    width: '100%',
  },
})
