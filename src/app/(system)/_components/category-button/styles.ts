import { StyleSheet } from 'react-native';
import { fonts } from '@/styles/fonts';  // Importe as fontes de forma correta

export const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: fonts.heading.md.fontFamily,  // Fonte de negrito
  },
  selectedButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#2C56C9',
    width: '50%',
  },
  selectedButtonText: {
    color: '#2C56C9',
  },
  
});
