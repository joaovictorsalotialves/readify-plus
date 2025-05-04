import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: -20,
    gap: 8,
  },
  searchInput: {
    flex: 1,
  },
  filterButton: {
    backgroundColor: colors.gray[200],
    padding: 10,
    borderRadius: 8,
  },
  scroll: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.gray[200],
    gap: 12,
  },
  itemLabel: {
    ...fonts.body.md,
    fontSize: 16,
    color: colors.gray[500],
  },
  catalogButtonWrapper: {
    paddingHorizontal: 10,
    marginTop: 16,
    marginBottom: 12,
  },
  catalogButton: {
    backgroundColor: colors.blue,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    
  },
  catalogButtonText: {
    color: '#fff',

    ...fonts.heading.md,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: colors.gray[100],
    borderTopWidth: 1,
    borderColor: colors.gray[200],
    marginTop: 16,
  },
  body: {
    paddingHorizontal: 20,
    gap: 12,
  },
});
