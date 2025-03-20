import { StyleSheet } from 'react-native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const styles = StyleSheet.create({
  header: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordText: {
    ...fonts.body.sm,
    color: colors.gray[900],
    textAlign: 'right',
  },
})
