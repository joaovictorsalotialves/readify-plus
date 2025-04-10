import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: colors.gray[100],
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewUsername: {
    fontFamily: fonts.heading.sm.fontFamily,
    fontSize: fonts.heading.sm.fontSize,
    color: colors.gray[600],
  },
  reviewDate: {
    fontFamily: fonts.body.xs.fontFamily,
    fontSize: fonts.body.xs.fontSize,
    color: colors.gray[400],
  },
  reviewComment: {
    fontFamily: fonts.body.sm.fontFamily,
    fontSize: fonts.body.sm.fontSize,
    color: colors.gray[600],
    marginBottom: 8,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  shareIcon: {
    color: colors.gray[400],
  },
  shareText: {
    fontFamily: fonts.body.xs.fontFamily,
    fontSize: fonts.body.xs.fontSize,
    color: colors.gray[400],
  },
});
