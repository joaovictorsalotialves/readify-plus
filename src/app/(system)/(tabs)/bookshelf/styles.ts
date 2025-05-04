import { fonts } from '@/styles/fonts'
import { StyleSheet } from 'react-native'
import { colors } from '@/styles/colors'

export const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
    gap: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: 250,
    height: 250,
    marginBottom: 25,
  },
  emptyText: {
    fontSize: 20,
    color: colors.gray[900],
    textAlign: 'center',
    fontFamily: fonts.body.button.fontFamily,
  },
})
