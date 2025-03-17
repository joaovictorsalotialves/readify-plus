import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  subtitle: {
    ...fonts.heading.subtitleMd,
    color: colors.gray[900],
  },
})

export default styles
