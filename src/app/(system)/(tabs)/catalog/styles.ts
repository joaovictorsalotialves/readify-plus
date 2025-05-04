import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

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
});
