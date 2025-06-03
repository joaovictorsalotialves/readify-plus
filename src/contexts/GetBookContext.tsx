import { type ReactNode, createContext, useEffect, useState } from 'react'

import { storageAuthTokenGet } from '@/storage/storageAuthToken'

import type { BooksDTO } from '@/dtos/book-dto'
import { addBookFavoriteService } from '@/services/addFavoriteBookService'
import { removeBookReviewService } from '@/services/deleteBookReviewService'
import { getBookService } from '@/services/getBookService'
import { removeBookFavoriteService } from '@/services/removeFavoriteBookService'

export type GetBookContextDataProps = {
  book: BooksDTO
  isFavorite: boolean
  isLoadingBook: boolean
  getBook: (bookId: string) => Promise<void>
  toggleFavorite: () => Promise<void>
  removeBookReview: (assessementId: string, userId: string) => Promise<void>
}

type GetBookContextProviderProps = {
  children: ReactNode
}

export const GetBookContext = createContext<GetBookContextDataProps>(
  {} as GetBookContextDataProps
)

export function GetBookContextProvider({
  children,
}: GetBookContextProviderProps) {
  const [book, setBook] = useState<BooksDTO>({} as BooksDTO)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [isLoadingBook, setIsLoadingBook] = useState(true)

  async function getBook(bookId: string) {
    try {
      setIsLoadingBook(true)

      const { token } = await storageAuthTokenGet()

      if (token) {
        const { book, isFavorite } = await getBookService({ bookId, token })
        setBook(book)
        setIsFavorite(isFavorite)
      }
    } finally {
      setIsLoadingBook(false)
    }
  }

  async function toggleFavorite() {
    const { token } = await storageAuthTokenGet()

    if (isFavorite) {
      await removeBookFavoriteService({ bookId: book.id, token })
      setBook({ ...book, favorite: book.favorite - 1 })
    } else {
      await addBookFavoriteService({ bookId: book.id, token })
      setBook({ ...book, favorite: book.favorite + 1 })
    }

    setIsFavorite(!isFavorite)
  }

  async function removeBookReview(assessementId: string, userId: string) {
    await removeBookReviewService({
      assessementId,
      userId,
    })
    setBook({ ...book, assessements: book.assessements - 1 })
  }

  return (
    <GetBookContext.Provider
      value={{
        book,
        isFavorite,
        isLoadingBook,
        getBook,
        toggleFavorite,
        removeBookReview,
      }}
    >
      {children}
    </GetBookContext.Provider>
  )
}
