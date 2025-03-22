import type { MaterialIcons } from '@expo/vector-icons'

export const notificationIconMap: Record<
  'liked' | 'recommendation' | 'novelty',
  keyof typeof MaterialIcons.glyphMap
> = {
  liked: 'thumb-up',
  recommendation: 'book',
  novelty: 'new-releases',
}
