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
  },
  text: {
    ...fonts.body.button,
    color: colors.gray[100],
  },
  confirm: {
    backgroundColor: colors.blue,
  },
  redirect: {
    backgroundColor: colors.orange,
  },
  cancel: {
    backgroundColor: colors.danger,
  },
})
