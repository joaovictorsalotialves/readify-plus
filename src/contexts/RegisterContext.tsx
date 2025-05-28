import type { RegisterBodyDTO } from '@/dtos/register-user-dto'
import { registerUserService } from '@/services/registerUserService'
import { storageAuthTokenSave } from '@/storage/storageAuthToken'
import { createContext, useContext, useState } from 'react'

interface RegisterContextData {
  register: (data: RegisterBodyDTO) => Promise<void>
  isRegistering: boolean
  registerData: Partial<RegisterBodyDTO>
  setRegisterData: (data: Partial<RegisterBodyDTO>) => Promise<void>
  setPreferences: (genres: string[], writers: string[]) => Promise<void>
}

export const RegisterContext = createContext({} as RegisterContextData)

export function RegisterContextProvider({
  children,
}: { children: React.ReactNode }) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [registerData, setRegisterDataState] = useState<
    Partial<RegisterBodyDTO>
  >({})

  async function setRegisterData(data: Partial<RegisterBodyDTO>) {
    setRegisterDataState(prev => ({ ...prev, ...data }))
  }

  async function setPreferences(
    favoriteCategories: string[],
    favoriteWriters: string[]
  ) {
    setRegisterDataState(prev => ({
      ...prev,
      favoriteCategories,
      favoriteWriters,
    }))
  }

  async function register(user: RegisterBodyDTO) {
    try {
      setIsRegistering(true)

      const { token, refreshToken } = await registerUserService({ user })

      await storageAuthTokenSave({ token, refreshToken })
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <RegisterContext.Provider
      value={{
        register,
        isRegistering,
        registerData,
        setRegisterData,
        setPreferences,
      }}
    >
      {children}
    </RegisterContext.Provider>
  )
}

export function useRegisterContext() {
  return useContext(RegisterContext)
}
