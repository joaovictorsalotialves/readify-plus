import React, { useState } from 'react'

import { MaterialIcons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import { Pressable, Text, View } from 'react-native'

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

  return (
    <View style={systemStyles.container}>
      <ResourceHeader title="Título do Livro" icon="arrow-back" />
      {/* TODO: Adicionar o componente para mostrar o pdf do livro */}
      <View style={{ flex: 1, backgroundColor: '#ccc' }} />

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
    </View>
  )
}
