import { useEffect, useRef, useState } from 'react'

import * as FileSystem from 'expo-file-system'
import {
  Dimensions,
  type GestureResponderEvent,
  PanResponder,
  type PanResponderGestureState,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Pdf from 'react-native-pdf'

import { ResourceHeader } from '../../_components/resource-header'
import {
  Asside,
  AssideButton,
  ContainerAssideButtons,
} from '../_components/asside'

import { systemStyles } from '../../_styles/styles'
import { styles } from './styles'

import { lineSpacing as _lineSpacing } from '@/utils/mocks/lineSpacing'

import { useBook } from '@/hooks/useBook'
import { urlApi } from '@/lib/axios'

export default function Read() {
  const { book } = useBook()

  const [page, setPage] = useState(1)
  const [isVisible, setIsVisible] = useState(true)

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (
        _: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        const { dx } = gestureState

        if (dx < -50) {
          // arrastou para a esquerda → próxima página
          setPage(prev => Math.min(prev + 1, 248))
        } else if (dx > 50) {
          // arrastou para a direita → página anterior
          setPage(prev => Math.max(prev - 1, 1))
        }
      },
    })
  ).current

  const [pdfUri, setPdfUri] = useState<string | null>(null)

  useEffect(() => {
    const downloadPdf = async () => {
      try {
        const localPath = FileSystem.documentDirectory + book.bookPath
        const fileInfo = await FileSystem.getInfoAsync(localPath)

        if (!fileInfo.exists) {
          const { uri } = await FileSystem.downloadAsync(
            `${urlApi}/e-books/${book.bookPath}`,
            localPath
          )
          setPdfUri(uri)
        } else {
          setPdfUri(fileInfo.uri)
        }
      } catch (err) {
        console.error('Erro ao baixar o PDF:', err)
      }
    }

    downloadPdf()
  }, [book.bookPath])

  return (
    <View style={systemStyles.container}>
      {isVisible && <ResourceHeader title={book.title} icon="arrow-back" />}

      <View style={{ flex: 1 }} {...panResponder.panHandlers}>
        {pdfUri && (
          <>
            <Pdf
              source={{ uri: pdfUri }}
              style={{ flex: 1, width: Dimensions.get('window').width }}
              horizontal
              page={page}
              onPageChanged={setPage}
            />

            {/* Camada invisível para detectar toques */}
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                zIndex: 1,
              }}
              pointerEvents="box-only"
              onStartShouldSetResponder={() => true}
              onResponderRelease={() => setIsVisible(prev => !prev)}
            />
          </>
        )}
      </View>

      {isVisible && (
        <Asside>
          <Text style={styles.pagination}>
            Página {page}/{book.numberPage}
          </Text>
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
      )}
    </View>
  )
}
