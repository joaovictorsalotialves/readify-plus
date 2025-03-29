import { useRef, useState } from 'react'

import type BottomSheet from '@gorhom/bottom-sheet'
import Slider from '@react-native-community/slider'
import { Text, TouchableWithoutFeedback, View } from 'react-native'

import { ResourceHeader } from '../../_components/resource-header'
import {
  Asside,
  AssideButton,
  ContainerAssideButtons,
} from '../_components/asside'
import { Sheet } from '../_components/sheet'

import { colors } from '@/styles/colors'
import { systemStyles } from '../../_styles/styles'
import { styles } from './styles'

export default function Read() {
  const [page, setPage] = useState(20)
  const [isVisible, setIsVisible] = useState(true)

  const [isVisibleAudiobookSheet, setIsVisibleAudiobookSheet] = useState(false)
  const bottomSheetAudiobookRef = useRef<BottomSheet>(null)

  function toggleVisibleControls() {
    if (!isVisibleAudiobookSheet) {
      setIsVisible(!isVisible)
    }
  }

  return (
    <View style={systemStyles.container}>
      {isVisible && (
        <ResourceHeader title="Título do Livro" icon="arrow-back" />
      )}

      <TouchableWithoutFeedback onPress={toggleVisibleControls}>
        {/* TODO: Adicionar o componente para mostrar o pdf do livro */}
        <View style={{ flex: 1 }} />
      </TouchableWithoutFeedback>

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
            <AssideButton
              icon="play-arrow"
              onPress={() => {
                setIsVisible(false)
                setIsVisibleAudiobookSheet(true)
              }}
            />
          </ContainerAssideButtons>
        </Asside>
      )}

      {isVisibleAudiobookSheet && (
        <Sheet
          ref={bottomSheetAudiobookRef}
          snapPoints={[130]}
          onChange={index => {
            if (index === -1) {
              setIsVisibleAudiobookSheet(false)
              setIsVisible(true)
            } else {
              bottomSheetAudiobookRef.current?.snapToIndex(0)
            }
          }}
        >
          <Asside>
            <Text style={styles.pagination}>Página {page}/248</Text>
            <ContainerAssideButtons>
              <AssideButton
                icon="keyboard-arrow-left"
                onPress={() => setPage(page - 1)}
              />
              <AssideButton icon="play-arrow" />
              <AssideButton
                icon="keyboard-arrow-right"
                onPress={() => setPage(page + 1)}
              />
            </ContainerAssideButtons>
          </Asside>
        </Sheet>
      )}
    </View>
  )
}
