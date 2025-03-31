import { StyleSheet } from 'react-native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const styles = StyleSheet.create({
  button: {
    position: 'relative',
    justifyContent: 'center',
    width: '100%',
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: colors.gray[200],
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.gray[400],
  },
  buttonText: {
    color: colors.gray[800],
    ...fonts.body.lg,
  },
  item: {
    padding: 12,
    backgroundColor: colors.gray[100],
  },
  selectedItem: {
    backgroundColor: colors.gray[200],
  },
  itemText: {
    ...fonts.body.lg,
    color: colors.gray[800],
  },
  dropdown: {
    borderRadius: 10,
    backgroundColor: colors.gray[100],
  },
})
