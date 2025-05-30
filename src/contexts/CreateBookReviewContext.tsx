import { type ReactNode, createContext, useState } from 'react'

import { createBookReviewService } from '@/services/createBookReviewService'
import { storageAuthTokenGet } from '@/storage/storageAuthToken'

export type CreateBookReviewContextDataProps = {
  isLoadingCreateBookReview: boolean
  createBookReview: (
    score: number,
    comment: string,
    bookId: string
  ) => Promise<void>
}

type CreateBookReviewContextProviderProps = {
  children: ReactNode
}

export const CreateBookReviewContext =
  createContext<CreateBookReviewContextDataProps>(
    {} as CreateBookReviewContextDataProps
  )

export function CreateBookReviewContextProvider({
  children,
}: CreateBookReviewContextProviderProps) {
  const [isLoadingCreateBookReview, setIsLoadingCreateBookReview] =
    useState(true)

  async function createBookReview(
    score: number,
    comment: string,
    bookId: string
  ) {
    try {
      setIsLoadingCreateBookReview(true)
      const { token } = await storageAuthTokenGet()

      if (token) {
        await createBookReviewService({ score, comment, bookId, token })
      }
    } finally {
      setIsLoadingCreateBookReview(false)
    }
  }

  return (
    <CreateBookReviewContext.Provider
      value={{
        isLoadingCreateBookReview,
        createBookReview,
      }}
    >
      {children}
    </CreateBookReviewContext.Provider>
  )
}
