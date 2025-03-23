import { Heading } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    position: 'relative', // Permite posicionamento absoluto dentro do header
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#C8D0DA',
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
    width: '100%', // Ocupa toda a imagem
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#C8D0DA', // Leve escurecimento para indicar interatividade
  },
  editIconInner: {
    backgroundColor: 'transparent', // Fundo totalmente transparente
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 24,
  
  },
  username: {
    fontSize: 30,
    fontWeight: 'bold',
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
    borderBottomColor: '#C8D0DA',
    alignItems: 'center',
  },
  bookCoverContainer: {
    alignItems: 'center',
  },
  bookCover: {
    width: 100,
    height: 150,
    backgroundColor: '#DAE4F2',
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
    alignSelf: 'flex-start', // Alinha as estrelas com a borda do livro
  },
  bookDate: {
    fontSize: 12,
    color: '#6F7D90',
    marginBottom: 5, // Ajuste de espaçamento
  },
  bookDescription: {
    fontSize: 14,
    color: '#21252C',
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
  backgroundColor: '##F2F6FA', // Ajuste conforme necessário
  padding: 12,
  borderRadius: 8,
  width: 110,
},

statInfo: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '##0F1216',
  textAlign: 'left'
},

statLabel: {
  fontSize: 14,
  color: '##0F1216',
  textAlign: 'center',
},

});
