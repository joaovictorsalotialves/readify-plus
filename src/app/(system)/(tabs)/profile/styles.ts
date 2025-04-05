import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    position: 'relative',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: colors.gray[300],
  },
  editIconInner: {
    backgroundColor: 'transparent',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 24,
  },
  username: {
    fontWeight: 'bold',
    ...fonts.heading.hg
  },
  settingsButton: {
    position: 'absolute',
    top: 1,
    left: 190,
  },
  stats: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 20,
  },
  bookItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[300],
    alignItems: 'center',
  },
  bookCoverContainer: {
    alignItems: 'center',
  },
  bookCover: {
    width: 100,
    height: 150,
    backgroundColor: colors.gray[200],
    borderRadius: 5,
  },
  bookTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  bookInfo: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'center',
  },
  rating: {
    flexDirection: 'row',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  bookDate: {
    fontSize: 12,
    color: colors.gray[500],
    marginBottom: 5,
  },
  bookDescription: {
    fontSize: 14,
    color: colors.gray[700],
  },
  bookInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  moreOptionsButton: {
    padding: 1,
    borderRadius: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    padding: 12,
    borderRadius: 8,
    width: 110,
  },
  statInfo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.gray[900],
    textAlign: 'left',
  },
  statLabel: {
    fontSize: 14,
    color: colors.gray[900],
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 32, // Dá um respiro no topo
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 5,
  },
  emptyText: {
    fontSize: 18,
    color: colors.gray[900],
    textAlign: 'center',
    fontFamily: fonts.body.button.fontFamily,
  },

});
