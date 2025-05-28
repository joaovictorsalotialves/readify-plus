import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: colors.gray[100],
    padding: 16,
  },
  avatarContainer: {
    alignItems: 'flex-start',
    marginTop: 32, // ✅ Adicionamos um espaçamento superior para afastar do header
    marginBottom: 75,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 70,
    backgroundColor: colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: fonts.body.md.fontFamily,
    fontSize: fonts.body.md.fontSize,
    color: colors.gray[600],
    marginBottom: 10,
  },
  input: {
    backgroundColor: colors.gray[200],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: fonts.body.md.fontSize,
    fontFamily: fonts.body.md.fontFamily,
    color: colors.gray[900],
    borderWidth: 1,
    borderColor: colors.gray[300],
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonOrange: {
    backgroundColor: colors.orange,
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
