import type { MaterialIcons } from '@expo/vector-icons'
import { FlatList, View } from 'react-native'

import ResourceHeader from '../_components/resource-header'
import { Notification } from './_components/notification'

import { systemStyles } from '../_styles/styles'
import { styles } from './styles'

import { notificationIconMap } from '@/utils/mappers/notificationIconMap'
import { notifications } from '@/utils/mocks/notifications'

export default function Notifications() {
  return (
    <View style={systemStyles.container}>
      <ResourceHeader title="Notificação" />

      <View style={styles.body}>
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Notification
              title={item.title}
              date={item.date}
              icon={
                notificationIconMap[
                  item.type
                ] as keyof typeof MaterialIcons.glyphMap
              }
            />
          )}
        />
      </View>
    </View>
  )
}
