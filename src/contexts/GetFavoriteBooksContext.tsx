import { getFavoriteBooksService } from '@/services/getFavoriteBooks'
import { storageAuthTokenGet } from '@/storage/storageAuthToken'
import { type ReactNode, createContext, useState } from 'react'

interface Book {
  id: string
  title: string
  // Adicione outros campos conforme necessário
}

interface GetFavoriteBooksContextProps {
  favoriteBooks: Book[]
  isLoadingFavoriteBooks: boolean
  getFavoriteBooks: () => Promise<void>
}

export const GetFavoriteBooksContext = createContext(
  {} as GetFavoriteBooksContextProps
)

export function GetFavoriteBooksContextProvider({
  children,
}: { children: ReactNode }) {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([])
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
