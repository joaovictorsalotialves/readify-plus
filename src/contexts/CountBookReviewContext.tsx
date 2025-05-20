import { type ReactNode, createContext, useState } from 'react'

import { countBookReviewService } from '@/services/countBookReviewService'
import { storageAuthTokenGet } from '@/storage/storageAuthToken'

export type CountBookReviewContextDataProps = {
  countBookReview: number
  isLoadingCountBookReview: boolean
  getCountBookReview: () => Promise<void>
}

type CountBookReviewContextProviderProps = {
  children: ReactNode
}

export const CountBookReviewContext =
  createContext<CountBookReviewContextDataProps>(
    {} as CountBookReviewContextDataProps
  )

export function CountBookReviewContextProvider({
  children,
}: CountBookReviewContextProviderProps) {
  const [countBookReview, setCountBookReview] = useState<number>(0)
  const [isLoadingCountBookReview, setIsLoadingCountBookReview] = useState(true)

  async function getCountBookReview() {
    const { token } = await storageAuthTokenGet()

    if (token) {
      const { count } = await countBookReviewService({ token })
      setCountBookReview(count)
    }

    setIsLoadingCountBookReview(false)
  }

  return (
    <CountBookReviewContext.Provider
      value={{
        countBookReview,
        isLoadingCountBookReview,
        getCountBookReview,
      }}
    >
      {children}
    </CountBookReviewContext.Provider>
  )
}
