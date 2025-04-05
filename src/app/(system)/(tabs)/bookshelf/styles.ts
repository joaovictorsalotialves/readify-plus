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
    color: colors.gray[600],
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[200],
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: colors.gray[600],
  },
  filterButton: {
    padding: 10,
  },
  contextGallery: {
    gap: 12,
    paddingBottom: 20,
  },
  slider: {
    gap: 12,
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
