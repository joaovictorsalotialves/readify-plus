import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  statItem: {
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: fonts.body.sm.fontFamily,
    fontSize: fonts.body.sm.fontSize,
    color: colors.gray[900],
    textAlign: 'center',
  },
  statValue: {
    fontFamily: fonts.heading.sm.fontFamily,
    fontSize: fonts.heading.sm.fontSize,
    color: colors.gray[900],
    textAlign: 'center',
  },
  
});
