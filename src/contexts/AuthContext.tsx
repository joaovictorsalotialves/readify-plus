import { type ReactNode, createContext, useEffect, useState } from 'react'

import type { UserDTO } from '@/dtos/user-dto'

import { authenticateService } from '@/services/authenticateService'
import { getUserProfileService } from '@/services/getUserProfileService'

import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from '@/storage/storageAuthToken'
import { storageUserSave } from '@/storage/storageUser'
import { router } from 'expo-router'

export type AuthContextDataProps = {
  user: UserDTO | null
  login: (email: string, password: string) => Promise<void>
  auth: () => Promise<void>
  isLoading: boolean
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
      const { token } = await storageAuthTokenGet()
      if (token) {
        const { user } = await getUserProfileService({ token })
        if (user) {
          await storageUserSave(user)
          setUser(user)
          setIsLoading(false)
        }
      }
    } catch (error) {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  async function login(email: string, password: string) {
    const { token, refreshToken } = await authenticateService({
      email,
      password,
    })

    await storageAuthTokenSave({ token, refreshToken })
    await auth()

    router.replace('/(system)/(tabs)/home')
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    auth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, auth, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
