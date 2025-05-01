import { api } from '@/lib/axios'

type getUserProfileRequest = {
  token: string
}

type getUserProfileResponse = {
  user: {
    id: string
    name: string
    username: string
    email: string
    createdAt: Date
  }
}

export async function getUserProfileService({
  token,
}: getUserProfileRequest): Promise<getUserProfileResponse> {
  const { data } = await api.get('/me', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return { user: data.user }
}
