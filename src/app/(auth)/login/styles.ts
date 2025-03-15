import { StyleSheet } from 'react-native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  header: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  box: {
    width: '100%',
    gap: 18,
  },
})

export default styles
