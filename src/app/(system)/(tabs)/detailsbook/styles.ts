import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  scrollContent: {
    paddingBottom: 24,
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.gray[100],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    ...fonts.heading.lg,
    color: colors.gray[800],
    flex: 1,
    textAlign: 'left',
    marginHorizontal: 8,
  },
  likeButton: {
    padding: 4,
  },
  coverContainer: {
    flexDirection: 'row',
    paddingHorizontal:20,
    paddingTop: 20,
  },
  bookCover: {
    width: 100,
    height: 150,
    backgroundColor: colors.gray[200],
    borderRadius: 5,
  },
  bookInfo: {
    marginLeft: 16,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    ...fonts.heading.subtitleSm,
    color: colors.gray[600],
    marginBottom: 4,
  },
  value: {
    ...fonts.body.md,
    color: colors.gray[800],
    marginBottom: 12,
  },
  readSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  linkGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.gray[200],
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  linkColumn: {
    justifyContent: 'space-between',
  },
  linkLabel: {
    ...fonts.body.sm,
    color: colors.gray[600],
    marginBottom: 8,
  },
  linkValue: {
    ...fonts.heading.subtitleMd,
    color: colors.gray[800],
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    marginTop: 50,
    paddingHorizontal: 50,
    flex: 1
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    ...fonts.heading.lg,
    color: colors.gray[800],
    marginBottom: 16,
  },
  bookDescription: {
    ...fonts.body.md,
    color: colors.gray[500],
    marginBottom: 16,
    lineHeight: 22,
  },
  detailsContainer: {
    marginTop: 8,
  },
  detailText: {
    ...fonts.body.md,
    color: colors.gray[700],
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  recommendationsContainer: {
    gap: 16,
    paddingLeft: 20,
    paddingBottom: 8,
  },
  recommendedBook: {
    width: 98,
    alignItems: "stretch",
    marginRight: 1,
    flex: 1
  },
  recommendedCover: {
    width: 100,
    height: 140,
    borderRadius: 8,
    backgroundColor: colors.gray[200],
  },
  recommendedTitle: {
    ...fonts.body.sm,
    color: colors.gray[800],
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  bookSubTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
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
  linkButton: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
  flex: 1,
},
rightIcon: {
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: colors.gray[800],
  padding: 6,
  borderRadius: 8,
},
statsGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  paddingHorizontal: 7,
  marginTop: 8,
},
header: {
  alignItems: 'center',
  paddingVertical: 20,
},
contextGallery: {
  gap: 24,
},
paginationContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
  marginTop: 16,
},

pageButton: {
  backgroundColor: colors.gray[400],
  borderRadius: 8,
  paddingVertical: 6,
  paddingHorizontal: 12,
},

activePageButton: {
  backgroundColor: colors.blue,
},

pageButtonText: {
  color: colors.gray[100],
  fontWeight: 'bold',
},

});