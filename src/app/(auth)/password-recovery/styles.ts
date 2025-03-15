import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  header: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  headerLogo: {
    ...fonts.heading.hg,
    color: colors.gray[100],
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
  subtitle: {
    ...fonts.heading.subtitleMd,
  },
  box: {
    width: '100%',
    gap: 18,
  },
})

export default styles
