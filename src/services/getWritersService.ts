import { api } from '@/lib/axios'

import type { WriterDTO } from '@/dtos/writer-dto'

export type getWritersResponse = {
  writers: WriterDTO[]
}

export async function getWritersService(): Promise<getWritersResponse> {
  const { data } = await api.get('/writers')

  return { writers: data.writers }
}
