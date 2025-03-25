import React, { useState } from 'react'

import { MaterialIcons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import { Pressable, Text, View } from 'react-native'

import { ResourceHeader } from '../../_components/resource-header'

import { colors } from '@/styles/colors'
import { systemStyles } from '../../_styles/styles'
import { styles } from './styles'

export default function Read() {
  const [page, setPage] = useState(20)

  return (
    <View style={systemStyles.container}>
      <ResourceHeader title="Título do Livro" icon="arrow-back" />
      {/* TODO: Adicionar o componente para mostrar o pdf do livro */}
      <View style={{ flex: 1, backgroundColor: '#ccc' }} />
      <View style={styles.asside}>
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
        <View style={styles.containerButtons}>
          <Pressable style={styles.button}>
            <MaterialIcons
              name="format-size"
              color={colors.gray[900]}
              size={32}
            />
          </Pressable>
          <Pressable style={styles.button}>
            <MaterialIcons
              name="play-arrow"
              color={colors.gray[900]}
              size={32}
            />
          </Pressable>
        </View>
      </View>
    </View>
  )
}
