import { useState } from 'react'

import Slider from '@react-native-community/slider'
import { Text, TouchableWithoutFeedback, View } from 'react-native'

import { ResourceHeader } from '../../_components/resource-header'

import { colors } from '@/styles/colors'
import { systemStyles } from '../../_styles/styles'
import {
  Asside,
  AssideButton,
  ContainerAssideButtons,
} from '../_components/asside'
import { styles } from './styles'

export default function Read() {
  const [page, setPage] = useState(20)
  const [isVisible, setIsVisible] = useState(false)

  const showControls = () => {
    setIsVisible(true)
    setTimeout(() => setIsVisible(false), 5000)
  }

  return (
    <TouchableWithoutFeedback onPress={showControls}>
      <View style={systemStyles.container}>
        {isVisible && (
          <ResourceHeader title="Título do Livro" icon="arrow-back" />
        )}

        {/* TODO: Adicionar o componente para mostrar o pdf do livro */}
        <View style={{ flex: 1 }} />

        {isVisible && (
          <Asside>
            <Text style={styles.pagination}>Página {page}/248</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={248}
              step={1}
              value={page}
              onValueChange={value => setPage(value)}
              minimumTrackTintColor={colors.gray[900]}
              maximumTrackTintColor={colors.gray[400]}
              thumbTintColor={colors.gray[900]}
            />
            <ContainerAssideButtons>
              <AssideButton icon="format-size" />
              <AssideButton icon="play-arrow" />
            </ContainerAssideButtons>
          </Asside>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}
