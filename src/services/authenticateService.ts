import { api } from '@/lib/axios'

type AuthenticateServiceRequest = {
  email: string
  password: string
}

export type AuthenticateServiceResponse = {
  token: string
  refreshToken: string
}

export async function authenticateService({
  email,
  password,
}: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
  const { data } = await api.post('/sessions', {
    email,
    password,
  })

  return {
    token: data.token,
    refreshToken: data.refreshToken,
  }
}
