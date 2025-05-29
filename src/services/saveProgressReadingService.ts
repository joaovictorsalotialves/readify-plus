import { api } from '@/lib/axios'

import type { ReadingDTO } from '@/dtos/reading-dto'

type saveProgressReadingRequest = {
  readingId: string
  lastPageRead: number
  duration: number
  token: string
}

export type saveProgressReadingResponse = {
  reading: ReadingDTO
}

export async function saveProgressReadingService({
  readingId,
  lastPageRead,
  duration,
  token,
}: saveProgressReadingRequest): Promise<saveProgressReadingResponse> {
  const { data } = await api.post(
    `/reading/${readingId}/save-progress`,
    {
      lastPageRead,
      duration,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  return { reading: data.reading }
}
