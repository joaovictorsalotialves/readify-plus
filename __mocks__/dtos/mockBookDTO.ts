import type { BooksDTO } from '@/dtos/book-dto'

export const mockBook: BooksDTO = {
  id: 'book-1',
  title: 'O Senhor dos Anéis',
  urlCover: 'https://example.com/covers/senhor-dos-aneis.jpg',
  bookPath: '/books/senhor-dos-aneis.pdf',
  synopsis: 'Uma jornada épica pela Terra Média em busca do Um Anel.',
  publisher: 'Editora Fantástica',
  numberPage: 1137,
  language: 'Português',
  ISBN: '978-85-01-12345-6',
  visits: 1200,
  score: 4.9,
  favorite: 340,
  assessements: 85,
  read: 210,
  writer: {
    id: 'writer-1',
    name: 'J.R.R. Tolkien',
  },
  category: {
    id: 'category-1',
    name: 'Fantasia',
  },
}

export const mockBooks: BooksDTO[] = [
  mockBook,
  {
    id: 'book-2',
    title: 'Dom Casmurro',
    urlCover: 'https://example.com/covers/dom-casmurro.jpg',
    bookPath: '/books/dom-casmurro.pdf',
    synopsis: 'A história de Bentinho e Capitu contada em primeira pessoa.',
    publisher: 'Editora Clássicos',
    numberPage: 256,
    language: 'Português',
    ISBN: '978-85-02-65432-1',
    visits: 800,
    score: 4.6,
    favorite: 190,
    assessements: 65,
    read: 140,
    writer: {
      id: 'writer-2',
      name: 'Machado de Assis',
    },
    category: {
      id: 'category-2',
      name: 'Romance',
    },
  },
]
