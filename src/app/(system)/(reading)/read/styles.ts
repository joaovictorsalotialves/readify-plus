import { StyleSheet } from 'react-native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const styles = StyleSheet.create({
  pagination: {
    textAlign: 'right',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  containerSheetSettings: {
    paddingHorizontal: 48,
    paddingVertical: 8,
  },
  field: {
    gap: 4,
  },
  label: {
    color: colors.gray[900],
    ...fonts.body.md,
  },
})
