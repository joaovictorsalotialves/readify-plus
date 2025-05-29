import * as FileSystem from 'expo-file-system'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Alert,
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

import { Loading } from '@/components/loading'
import { useAuth } from '@/hooks/useAuth'
import { useBook } from '@/hooks/useBook'
import { useReading } from '@/hooks/useReading'
import { urlApi } from '@/lib/axios'
import { getOrCreateReadingService } from '@/services/getOrCreateReadingService'
import {
  Redirect,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from 'expo-router'

export default function Read() {
  const { isLoading, user, auth } = useAuth()
  const { book, getBook, isLoadingBook } = useBook()
  const {
    reading,
    isLoadingReading,
    getOrCreateReading,
    saveProgressReading,
    page,
    setPage,
  } = useReading()

  const { bookId } = useLocalSearchParams()

  const [isVisible, setIsVisible] = useState(true)
  const [pdfUri, setPdfUri] = useState<string | null>(null)
  const [pdfLoaded, setPdfLoaded] = useState(false)

  const pageRef = useRef(page)
  const bookRef = useRef(book)
  const readingRef = useRef(reading)
  const startTimeRef = useRef<number | null>(null)

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
          setPage(p => (p && p < book.numberPage ? p + 1 : p))
        } else if (dx > 50) {
          setPage(p => (p && p > 1 ? p - 1 : 1))
        }
      },
    })
  ).current

  useFocusEffect(
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useCallback(() => {
      auth()
      if (typeof bookId === 'string') {
        getBook(bookId)
        getOrCreateReading(bookId)
      }
    }, [bookId])
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (pdfLoaded && reading?.lastPageRead) {
      setTimeout(() => {
        setPage(reading.lastPageRead)
      }, 100)
    }
  }, [pdfLoaded, reading?.lastPageRead])

  useEffect(() => {
    const loadPdf = async () => {
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
        Alert.alert('Erro ao exibir livro')
        router.back()
      }
    }

    if (book?.bookPath) {
      loadPdf()
    }
  }, [book.bookPath])

  useEffect(() => {
    pageRef.current = page
  }, [page])

  useEffect(() => {
    bookRef.current = book
  }, [book])

  useEffect(() => {
    readingRef.current = reading
  }, [reading])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    startTimeRef.current = Date.now()

    return () => {
      if (startTimeRef.current && reading) {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000)
        saveProgressReading(readingRef.current.id, duration, pageRef.current)
      }
    }
  }, [])

  if (!user) {
    return <Redirect href="/(auth)/login" />
  }

  if (isLoading || isLoadingBook || isLoadingReading) {
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
              onPageChanged={newPage => {
                if (pageRef.current !== newPage) {
                  setPage(newPage)
                  pageRef.current = newPage
                }
              }}
              onLoadComplete={() => setPdfLoaded(true)}
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
              onPress={() => {
                setPage(p => (p && p > 1 ? p - 1 : 1))
              }}
            />
            <AssideButton
              icon="keyboard-arrow-right"
              onPress={() => {
                setPage(p => (p && p < book.numberPage ? p + 1 : p))
              }}
            />
          </ContainerAssideButtons>
        </Asside>
      )}
    </View>
  )
}
