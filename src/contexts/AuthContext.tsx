import { type ReactNode, createContext, useEffect, useState } from 'react'

import type { UserDTO } from '@/dtos/user-dto'

import { authenticateService } from '@/services/authenticateService'
import { getUserProfileService } from '@/services/getUserProfileService'

import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from '@/storage/storageAuthToken'

export type AuthContextDataProps = {
  user: UserDTO | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  auth: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  async function auth() {
    try {
      setIsLoading(true)

      const { token } = await storageAuthTokenGet()
      if (token) {
        const { user } = await getUserProfileService({ token })
        if (user) {
          setUser(user)
        } else {
          setUser(null)
        }
      } else {
        setUser(null)
      }
    } catch (error) {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  async function login(email: string, password: string) {
    setIsLoading(true)

    const { token, refreshToken } = await authenticateService({
      email,
      password,
    })

    await storageAuthTokenSave({ token, refreshToken })
    await auth()
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, auth }}>
      {children}
    </AuthContext.Provider>
  )
}
