import { StyleSheet } from 'react-native';
import { fonts } from '@/styles/fonts';  
// Importe as fontes corretamente

export const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 20,
    gap: 12,  // Reduz o espaço entre os itens principais
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // Divide o espaço igualmente entre os botões
    width: '100%',  // Garante que o espaço ocupe toda a largura da tela
    marginBottom: 12,  // Ajusta o espaço entre os botões e o conteúdo
  },
  emptyContainer: {
    flex: 1,  // Faz com que o contêiner ocupe o restante da tela
    justifyContent: 'center',  // Centraliza o conteúdo
    alignItems: 'center',  // Centraliza horizontalmente
    paddingHorizontal: 20,  // Espaçamento nas laterais
  },
  emptyImage: {
    width: 250,  // Ajuste o tamanho da imagem
    height: 250,  // Ajuste o tamanho da imagem
    marginBottom: 20,  // Espaçamento entre a imagem e o texto
  },
  emptyText: {
    fontSize: 16,
    color: "#0F1216",
    textAlign: 'center',
    fontFamily: fonts.body.md.fontFamily,  // Fonte do texto
  },
});
