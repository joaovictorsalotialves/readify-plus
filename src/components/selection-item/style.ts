import { StyleSheet } from 'react-native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

const style = StyleSheet.create({
  context: {
    padding: 10,
    margin: 6,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.blue,
  },
  label: {
    ...fonts.heading.md,
  },
})

export { style }
