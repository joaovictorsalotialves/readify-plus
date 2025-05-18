import { type ReactNode, createContext, useState } from 'react'

import { countBooksReadService } from '@/services/countBooksReadService'
import { storageAuthTokenGet } from '@/storage/storageAuthToken'

export type CountBooksReadContextDataProps = {
  countBooksRead: number
  isLoadingCountBooksRead: boolean
  getCountBooksRead: () => Promise<void>
}

type CountBooksReadContextProviderProps = {
  children: ReactNode
}

export const CountBooksReadContext =
  createContext<CountBooksReadContextDataProps>(
    {} as CountBooksReadContextDataProps
  )

export function CountBooksReadContextProvider({
  children,
}: CountBooksReadContextProviderProps) {
  const [countBooksRead, setCountBooksRead] = useState<number>(0)
  const [isLoadingCountBooksRead, setIsLoadingCountBooksRead] = useState(true)

  async function getCountBooksRead() {
    const { token } = await storageAuthTokenGet()

    if (token) {
      const { count } = await countBooksReadService({ token })
      setCountBooksRead(count)
    }

    setIsLoadingCountBooksRead(false)
  }

  return (
    <CountBooksReadContext.Provider
      value={{
        countBooksRead,
        isLoadingCountBooksRead,
        getCountBooksRead,
      }}
    >
      {children}
    </CountBooksReadContext.Provider>
  )
}
