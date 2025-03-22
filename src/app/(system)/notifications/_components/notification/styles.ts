import { StyleSheet } from 'react-native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 80,
    paddingHorizontal: 20,
    gap: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray[300],
  },
  context: {
    flex: 1,
    gap: 4,
  },
  title: {
    width: '90%',
    ...fonts.heading.sm,
    color: colors.gray[900],
  },
  date: {
    ...fonts.body.xs,
    color: colors.gray[900],
  },
  point: {
    position: 'absolute',
    top: '15%',
    left: '100%',
    width: 8,
    height: 8,
    backgroundColor: colors.danger,
    borderRadius: '50%',
  },
})
