import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
  icons: {
    marginTop: 12,
    flexDirection: 'row',
  },
  reviewCard: {
    backgroundColor: colors.gray[100],
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewUsername: {
    fontFamily: fonts.heading.sm.fontFamily,
    fontSize: fonts.heading.sm.fontSize,
    color: colors.gray[600],
  },
  reviewDate: {
    fontFamily: fonts.body.xs.fontFamily,
    fontSize: fonts.body.xs.fontSize,
    color: colors.gray[400],
  },
  reviewComment: {
    fontFamily: fonts.body.sm.fontFamily,
    fontSize: fonts.body.sm.fontSize,
    color: colors.gray[600],
    marginBottom: 8,
  },

  // Contêiner para os botões
  buttonContainer: {
    flexDirection: 'row',
    gap: 12, // Espaçamento entre os botões
    marginTop: 10,
  },

  // Estilo atualizado para o botão de compartilhar
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 20,
  },

  shareIcon: {
    color: colors.gray[400],
  },
  shareText: {
    fontFamily: fonts.body.xs.fontFamily,
    fontSize: fonts.body.xs.fontSize,
    color: colors.gray[400],
  },

  // Estilo do botão de Like
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 20,
  },

  likeIcon: {
    color: colors.blue, // Cor azul para o ícone de like
  },

  likeText: {
    fontFamily: fonts.body.xs.fontFamily,
    fontSize: fonts.body.xs.fontSize,
    color: colors.blue, // Cor azul para o texto de like
  },

  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },

  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },

  userInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 2,
  },

  username: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },

  starRatingContainer: {
    marginTop: 4,
    marginBottom: 8,
  },
})
