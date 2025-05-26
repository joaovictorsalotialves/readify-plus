import { api } from '@/lib/axios'

import type { ReadingDTO } from '@/dtos/reading-dto'

type getOrCreateReadingRequest = {
  bookId: string
  token: string
}

export type getOrCreateReadingResponse = {
  reading: ReadingDTO
}

export async function getOrCreateReadingService({
  bookId,
  token,
}: getOrCreateReadingRequest): Promise<getOrCreateReadingResponse> {
  const { data } = await api.get(`/books/${bookId}/reading`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return { reading: data.reading }
}
