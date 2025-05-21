import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  body: {
    paddingHorizontal: 20,
    gap: 12,
  },
  contextGallery: {
    gap: 24,
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
