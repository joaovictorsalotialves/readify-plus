import type { NotificationData } from '@/utils/types/NotificationData'

export const notifications: NotificationData[] = [
  {
    id: '1',
    title: '(Username) curtiu o seu comentário',
    date: '27 de Fevereiro 2025',
    type: 'liked',
  },
  {
    id: '2',
    title: 'Sugestão de leitura - (Titulo do livro)',
    date: '27 de Fevereiro 2025',
    type: 'recommendation',
  },
  {
    id: '3',
    title: 'Novidade - (Titulo do livro)',
    date: '27 de Fevereiro 2025',
    type: 'novelty',
  },
  {
    id: '4',
    title:
      'Você parou na página 120 de (Titulo do livro). Continue sua leitura!',
    date: '27 de Fevereiro 2025',
    type: 'reminder',
  },
]
