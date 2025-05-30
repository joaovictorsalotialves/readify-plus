export interface ReadingDTO {
  id: string
  startTime: Date
  endTime: Date | null
  duration: number
  lastPageRead: number
  userId: string
  bookId: string
}
