import type { RegisterBodyDTO } from '@/dtos/register-user-dto'
import { api } from '@/lib/axios'

type RegisterServiceRequest = {
    user: RegisterBodyDTO
}

export type RegisterServiceResponse = {
  token: string
  refreshToken: string
}

export async function registerUserService({
  user
}: RegisterServiceRequest): Promise<RegisterServiceResponse> {
  const { data } = await api.post('/register', user)

  return {
    token: data.token,
    refreshToken: data.refreshToken,
  }
}
