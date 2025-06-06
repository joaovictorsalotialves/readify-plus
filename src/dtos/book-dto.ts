export type BooksDTO = {
  id: string
  title: string
  urlCover: string
  bookPath: string
  synopsis: string
  publisher: string
  numberPage: number
  language: string
  ISBN: string
  visits: number
  score: number
  favorite: number
  assessements: number
  read: number
  writer: {
    id: string
    name: string
  }
  category: {
    id: string
    name: string
  }
}
