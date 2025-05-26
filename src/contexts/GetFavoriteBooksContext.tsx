import type { BooksDTO } from '@/dtos/book-dto'
import { getFavoriteBooksService } from '@/services/getFavoriteBooks'
import { storageAuthTokenGet } from '@/storage/storageAuthToken'
import { type ReactNode, createContext, useState } from 'react'

interface GetFavoriteBooksContextProps {
  favoriteBooks: BooksDTO[]
  isLoadingFavoriteBooks: boolean
  getFavoriteBooks: () => Promise<void>
}

export const GetFavoriteBooksContext = createContext(
  {} as GetFavoriteBooksContextProps
)

export function GetFavoriteBooksContextProvider({
  children,
}: { children: ReactNode }) {
  const [favoriteBooks, setFavoriteBooks] = useState<BooksDTO[]>([])
  const [isLoadingFavoriteBooks, setIsLoadingFavoriteBooks] = useState(false)

  async function getFavoriteBooks() {
    try {
      setIsLoadingFavoriteBooks(true)

      const { token } = await storageAuthTokenGet()

      const { books } = await getFavoriteBooksService({ token })
      setFavoriteBooks(books)
    } finally {
      setIsLoadingFavoriteBooks(false)
    }
  }

  return (
    <GetFavoriteBooksContext.Provider
      value={{
        favoriteBooks,
        isLoadingFavoriteBooks,
        getFavoriteBooks,
      }}
    >
      {children}
    </GetFavoriteBooksContext.Provider>
  )
}
