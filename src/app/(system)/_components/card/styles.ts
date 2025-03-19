import { StyleSheet } from 'react-native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    backgroundColor: colors.gray[200],
  },
  info: {
    ...fonts.heading.xl,
    color: colors.gray[900],
  },
  label: {
    textAlign: 'center',
    ...fonts.body.sm,
    color: colors.gray[900],
  },
})

export default styles
