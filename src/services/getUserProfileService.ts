import { api } from '@/lib/axios'

import type { UserDTO } from '@/dtos/user-dto'

type getUserProfileRequest = {
  token: string
}

type getUserProfileResponse = {
  user: UserDTO
}

export async function getUserProfileService({
  token,
}: getUserProfileRequest): Promise<getUserProfileResponse> {
  const { data } = await api.get('/me', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return { user: data.user }
}
