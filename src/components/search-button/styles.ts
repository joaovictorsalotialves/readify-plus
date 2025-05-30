import { colors } from '@/styles/colors' // Ajuste o caminho conforme necessário
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[200], // Azul claro
    borderRadius: 10,
    paddingVertical: 1,
    paddingHorizontal: 12,
    flex: 10, // Garante que a barra de pesquisa ocupe o máximo de espaço
  },
  searchBar: {
    flex: 1,
    height: 45,
    backgroundColor: 'transparent', // Sem fundo
    paddingHorizontal: 10,
    fontSize: 18,
  },
  searchIcon: {
    marginRight: 10,
  },
  filterButton: {
    padding: 15,
    backgroundColor: colors.gray[100], // Azul para o filtro
    borderRadius: 8,
  },
})
