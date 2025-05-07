import { StyleSheet } from 'react-native'
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 20,
    gap: 24,
  },
  context: {
    flexDirection: 'row',
    gap: 20,
  },
  contextGallery: {
    gap: 24,
  },
  customHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 10,
    zIndex: 1,
  },
  headerTitle: {
  ...fonts.heading.lg,
    color: colors.gray[900],
    textAlign: 'center',
  },
  linkLabel: {
    ...fonts.body.lg,
    color: colors.gray[900],
    marginBottom: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    minHeight: 150,
    backgroundColor: colors.gray[200],
  },
  readSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  readButton: {
    backgroundColor: colors.blue,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  readButtonText: {
    color: colors.gray[100],
    ...fonts.heading,
  },
})
