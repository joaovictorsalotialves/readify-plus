import { View } from 'react-native'

import ResourceHeader from '../_components/resource-header'

import { systemStyles } from '../_styles/styles'
import { styles } from './styles'

export default function Notifications() {
  return (
    <View style={systemStyles.container}>
      <ResourceHeader title="Notificação" />
    </View>
  )
}
