import { createContext, type ReactNode, useState } from 'react'
import { getFavoriteBooks } from '@/services/getFavoriteBooks'

interface Book {
  id: string
  title: string
  // Adicione outros campos conforme necessário
}

interface GetFavoriteBooksContextProps {
  booksFavorites: Book[]
  isLoadingFavorites: boolean
  getFavorites: () => Promise<void>
}

export const GetFavoriteBooksContext = createContext({} as GetFavoriteBooksContextProps)

export function GetFavoriteBooksProvider({ children }: { children: ReactNode }) {
  const [booksFavorites, setBooksFavorites] = useState<Book[]>([])
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(false)

  async function getFavorites() {
    try {
      setIsLoadingFavorites(true)
      const data = await getFavoriteBooks()
      setBooksFavorites(data)
    } finally {
      setIsLoadingFavorites(false)
    }
  }

  return (
    <GetFavoriteBooksContext.Provider
      value={{ booksFavorites, isLoadingFavorites, getFavorites }}
    >
      {children}
    </GetFavoriteBooksContext.Provider>
  )
}
