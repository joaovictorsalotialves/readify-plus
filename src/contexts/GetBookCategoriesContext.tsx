import { type ReactNode, createContext, useState } from 'react'

import type { BookCategoryDTO } from '@/dtos/book-category-dto'
import { getBookCategoriesService } from '@/services/getBookCategoriesService'

export type GetBookCategoriesContextDataProps = {
  bookCategories: BookCategoryDTO[]
  isLoadingBookCategories: boolean
  getBookCategories: () => Promise<void>
}

type GetBookCategoriesContextProviderProps = {
  children: ReactNode
}

export const GetBookCategoriesContext =
  createContext<GetBookCategoriesContextDataProps>(
    {} as GetBookCategoriesContextDataProps
  )

export function GetBookCategoriesContextProvider({
  children,
}: GetBookCategoriesContextProviderProps) {
  const [bookCategories, setBookCategories] = useState<BookCategoryDTO[]>([])
  const [isLoadingBookCategories, setIsLoadingBookCategories] = useState(true)

  async function getBookCategories() {
    try {
      setIsLoadingBookCategories(true)
      const { bookCategories } = await getBookCategoriesService()
      setBookCategories(bookCategories)
    } finally {
      setIsLoadingBookCategories(false)
    }
  }

  return (
    <GetBookCategoriesContext.Provider
      value={{
        bookCategories,
        isLoadingBookCategories,
        getBookCategories,
      }}
    >
      {children}
    </GetBookCategoriesContext.Provider>
  )
}
