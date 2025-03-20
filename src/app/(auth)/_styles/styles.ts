import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'
import { StyleSheet } from 'react-native'

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    borderTopLeftRadius: 100,
    padding: 30,
    gap: 32,
  },
  title: {
    ...fonts.heading.hg,
    color: colors.gray[900],
  },
  subtitle: {
    ...fonts.heading.subtitleMd,
    color: colors.gray[900],
  },
  description: {
    ...fonts.body.sm,
    textAlign: 'justify',
    color: colors.gray[900],
  },
  context: {
    width: '100%',
    gap: 18,
  },
})
