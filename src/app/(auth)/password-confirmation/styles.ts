import { StyleSheet } from 'react-native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

const styles = StyleSheet.create({
  subtitle: {
    ...fonts.heading.subtitleMd,
    color: colors.gray[900],
  },
  description: {
    ...fonts.body.sm,
    textAlign: 'justify',
    color: colors.gray[900],
  },
})

export default styles
