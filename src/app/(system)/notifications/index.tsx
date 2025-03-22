import { View } from 'react-native'

import ResourceHeader from '../_components/resource-header'
import { Notification } from './_components/notification'

import { systemStyles } from '../_styles/styles'
import { styles } from './styles'

export default function Notifications() {
  return (
    <View style={systemStyles.container}>
      <ResourceHeader title="Notificação" />

      <View style={styles.body}>
        <Notification
          title="(Username) curtiu o seu comentário"
          date="27 de Fevereiro 2025"
          icon="thumb-up"
        />
        <Notification
          title="Sugestão de leitura - (Titulo do livro)"
          date="27 de Fevereiro 2025"
          icon="book"
        />
        <Notification
          title="Novidade - (Titulo do livro)"
          date="27 de Fevereiro 2025"
          icon="book"
        />
      </View>
    </View>
  )
}
