import { StyleSheet } from 'react-native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray[900],
    fontFamily: fonts.heading.md.fontFamily,
  },
  selectedButton: {
    borderBottomWidth: 1,
    borderBottomColor: colors.blue,
    width: '50%',
  },
  selectedButtonText: {
    color: colors.blue,
  },
})
