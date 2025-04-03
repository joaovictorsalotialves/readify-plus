export type NotificationType =
  | 'liked'
  | 'recommendation'
  | 'novelty'
  | 'reminder'

export type NotificationData = {
  id: string
  title: string
  date: string
  type: NotificationType
}
