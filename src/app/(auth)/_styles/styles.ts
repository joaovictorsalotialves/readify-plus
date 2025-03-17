import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'
import { StyleSheet } from 'react-native'

const authStyles = StyleSheet.create({
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
  context: {
    width: '100%',
    gap: 18,
  },
})

export default authStyles
