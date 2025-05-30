import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
    padding: 16,
  },
  label: {
    fontFamily: fonts.body.md.fontFamily,
    fontSize: fonts.body.md.fontSize,
    color: colors.gray[600],
    marginTop: 16,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[200],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.gray[300],
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontFamily: fonts.body.md.fontFamily,
    fontSize: fonts.body.md.fontSize,
    color: colors.gray[900],
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonBlue: {
    backgroundColor: colors.blue,
  },
  buttonText: {
    fontFamily: fonts.body.button.fontFamily,
    fontSize: fonts.body.button.fontSize,
    color: '#fff',
  },
});
