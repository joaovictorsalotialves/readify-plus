import { StyleSheet } from 'react-native'

import { colors } from '@/styles/colors'

export const styles = StyleSheet.create({
  input: {
    position: 'relative',
    width: '100%',
    height: 48,
    paddingHorizontal: 44,
    backgroundColor: colors.gray[200],
    color: colors.gray[800],
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.gray[400],
  },
  inputFocused: {
    borderWidth: 1,
    borderColor: colors.gray[800],
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.danger,
  },
  icon: {
    position: 'absolute',
    top: 14,
    left: 16,
    color: colors.gray[400],
  },
  iconFocused: {
    color: colors.gray[800],
  },
  iconFilled: {
    color: colors.gray[800],
  },
  iconError: {
    color: colors.danger,
  },
})
