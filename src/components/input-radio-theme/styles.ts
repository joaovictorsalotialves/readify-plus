import { StyleSheet } from 'react-native'

import { colors } from '@/styles/colors'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  buttonRadio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    borderWidth: 0.5,
    borderColor: colors.gray[900],
    height: 24,
    width: 24,
  },
  optionLight: {
    backgroundColor: colors.gray[100],
  },
  optionDark: {
    backgroundColor: colors.gray[900],
  },
})
