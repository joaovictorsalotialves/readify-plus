import { useRef, useState } from 'react'

import type BottomSheet from '@gorhom/bottom-sheet'
import Slider from '@react-native-community/slider'
import { Text, TouchableWithoutFeedback, View } from 'react-native'

import { Select } from '@/components/select'
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

import { fontSizes } from '@/utils/mocks/fontSizes'
import { fonts } from '@/utils/mocks/fonts'
import { lineSpacing as _lineSpacing } from '@/utils/mocks/lineSpacing'

export default function Read() {
  const [page, setPage] = useState(20)
  const [isVisible, setIsVisible] = useState(true)

  const [isVisibleSettingsSheet, setIsVisibleSettingsSheet] = useState(false)
  const bottomSheetSettingsRef = useRef<BottomSheet>(null)

  const [isVisibleAudiobookSheet, setIsVisibleAudiobookSheet] = useState(false)
  const bottomSheetAudiobookRef = useRef<BottomSheet>(null)

  const [font, setFont] = useState(fonts[0])
  const [fontSize, setFontSize] = useState(fontSizes[0])
  const [lineSpacing, setLineSpacing] = useState(_lineSpacing[0])

  function toggleVisibleControls() {
    if (!isVisibleAudiobookSheet && !isVisibleSettingsSheet) {
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
            <AssideButton
              icon="format-size"
              onPress={() => {
                setIsVisible(false)
                setIsVisibleSettingsSheet(true)
              }}
            />
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

      {isVisibleSettingsSheet && (
        <Sheet
          ref={bottomSheetSettingsRef}
          snapPoints={[500]}
          onChange={index => {
            if (index === -1) {
              setIsVisibleSettingsSheet(false)
              setIsVisible(true)
            } else {
              bottomSheetSettingsRef.current?.snapToIndex(0)
            }
          }}
        >
          <View style={styles.containerSheetSettings}>
            <View style={styles.field}>
              <Text style={styles.label}>Tipo de fonte:</Text>
              <Select data={fonts} onSelect={setFont} value={font} />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Tamanho da fonte:</Text>
              <Select
                data={fontSizes}
                onSelect={setFontSize}
                value={fontSize}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Espaçamento entre linhas:</Text>
              <Select
                data={_lineSpacing}
                onSelect={setLineSpacing}
                value={lineSpacing}
              />
            </View>
          </View>
        </Sheet>
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
          <Asside style={{ borderTopWidth: 0 }}>
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
