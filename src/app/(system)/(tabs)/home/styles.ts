import { StyleSheet } from 'react-native'

import { colors } from '@/styles/colors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
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
})
