import { useCallback, useEffect, useRef, useState } from 'react'

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

import {
  Asside,
  AssideButton,
  ContainerAssideButtons,
} from '../../../../components/asside'
import { ResourceHeader } from '../../../../components/resource-header'

import { systemStyles } from '../../_styles/styles'
import { styles } from './styles'

import { lineSpacing as _lineSpacing } from '@/utils/mocks/lineSpacing'

import { useBook } from '@/hooks/useBook'
import { useReading } from '@/hooks/useReading'

import { Loading } from '@/components/loading'
import { urlApi } from '@/lib/axios'
import { useFocusEffect } from 'expo-router'

export default function Read() {
  const { book } = useBook()
  const { reading, isLoadingReading, getOrCreateReading } = useReading()

  const [page, setPage] = useState(reading.lastPageRead)
  const [isVisible, setIsVisible] = useState(true)
  const [pdfUri, setPdfUri] = useState<string | null>(null)

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
          if (page < book.numberPage) setPage(prev => prev + 1)
        } else if (dx > 50) {
          // arrastou para a direita → página anterior
          if (page > 1) setPage(prev => prev - 1)
        }
      },
    })
  ).current

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

  useFocusEffect(
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useCallback(() => {
      getOrCreateReading(book.id)
    }, [book.id])
  )

  if (isLoadingReading) {
    return <Loading />
  }

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
