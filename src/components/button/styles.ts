import { StyleSheet } from 'react-native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const styles = StyleSheet.create({
  button: {
    height: 48,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  text: {
    ...fonts.body.button,
    color: colors.gray[100],
  },
  confirm: {
    borderColor: colors.blue,
    backgroundColor: colors.blue,
  },
  redirect: {
    borderColor: colors.orange,
    backgroundColor: colors.orange,
  },
  cancel: {
    borderColor: colors.danger,
    backgroundColor: colors.danger,
  },
  disable: {
    borderColor: colors.gray[400],
    backgroundColor: colors.gray[200],
  },
  textDisable: {
    color: colors.gray[400],
  },
})
