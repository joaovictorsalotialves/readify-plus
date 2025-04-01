import { StyleSheet } from 'react-native';
import { fonts } from '@/styles/fonts';

export const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 12, // Reduz o espaço entre os itens principais
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // Divide igualmente os botões Lidos e Favoritos
    width: '100%',  // Garante que ocupe toda a largura da tela
    marginBottom: 12,  // Ajusta o espaço entre os botões e a barra de pesquisa
  },
  button: {
    paddingVertical: 12,  // Aumenta o tamanho do botão
    paddingHorizontal: 24,  // Aumenta o espaço horizontal para tornar o botão maior
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',  // Faz com que cada botão ocupe metade da tela
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 18,  // Aumenta o tamanho da fonte
    fontWeight: 'bold',  // Aplica negrito
    color: '#333',
    fontFamily: fonts.heading.md.fontFamily,  // Aplica a fonte correta
  },
  selectedButton: {
    borderBottomWidth: 1,  // Linha abaixo do botão selecionado
    borderBottomColor: '#2C56C9',  // Linha azul para o botão selecionado
    width: '50%',  // Faz com que a linha ocupe toda a largura do botão
  },
  selectedButtonText: {
    color: '#2C56C9',  // Altera a cor do texto para azul quando o botão é selecionado
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DAE4F2',  // Cor de fundo para o search
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 12,  // Diminui o espaço entre o search e o próximo item
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    padding: 10,
  },
  contextGallery: {
    gap: 12,  // Diminui o espaço entre as seções de livros
    paddingBottom: 20, // Garante que haja espaço no final
  },
  slider: {
    gap: 12,  // Define o espaçamento entre os itens da lista horizontal
  },
});
