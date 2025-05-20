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
    paddingHorizontal: 20,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 7,
    marginTop: 8,
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
  contextGallery: {
    gap: 24,
  },
  
});
