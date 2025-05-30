import { type ReactNode, createContext, useEffect, useState } from 'react'

import type { AssessmentDTO } from '@/dtos/assessement-dto'
import { useBook } from '@/hooks/useBook'
import { getBookReviewsOfBookService } from '@/services/getBookReviewsOfBookService'
import { storageAuthTokenGet } from '@/storage/storageAuthToken'

export type GetBookReviewsOfBookContextDataProps = {
  assessements: AssessmentDTO[]
  isLoadingGetBookReviewsOfBook: boolean
  getBookReviewsOfBook: (bookId: string) => Promise<void>
}

type GetBookReviewsOfBookContextProviderProps = {
  children: ReactNode
}

export const GetBookReviewsOfBookContext =
  createContext<GetBookReviewsOfBookContextDataProps>(
    {} as GetBookReviewsOfBookContextDataProps
  )

export function GetBookReviewsOfBookContextProvider({
  children,
}: GetBookReviewsOfBookContextProviderProps) {
  const [assessements, setAssessements] = useState<AssessmentDTO[]>([])
  const [isLoadingGetBookReviewsOfBook, setIsLoadingGetBookReviewsOfBook] =
    useState(true)

  async function getBookReviewsOfBook(bookId: string) {
    try {
      setIsLoadingGetBookReviewsOfBook(true)
      const { token } = await storageAuthTokenGet()

      if (token) {
        const { assessements } = await getBookReviewsOfBookService({
          bookId,
          token,
        })
        setAssessements(assessements)
      }
    } finally {
      setIsLoadingGetBookReviewsOfBook(false)
    }
  }

  return (
    <GetBookReviewsOfBookContext.Provider
      value={{
        assessements,
        isLoadingGetBookReviewsOfBook,
        getBookReviewsOfBook,
      }}
    >
      {children}
    </GetBookReviewsOfBookContext.Provider>
  )
}
