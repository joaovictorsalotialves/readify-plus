import type { MaterialIcons } from '@expo/vector-icons'
import type { NotificationType } from '../types/NotificationData'

export const notificationIconMap: Record<
  NotificationType,
  keyof typeof MaterialIcons.glyphMap
> = {
  liked: 'thumb-up',
  recommendation: 'book',
  novelty: 'new-releases',
  reminder: 'schedule',
}
