import React, { useCallback, useState } from 'react'
import { Image, Text, View } from 'react-native'

import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'
import { CategoryButton } from '../../../../components/category-button'
import { FeaturedBooks } from '../../../../components/featured-books'
import { GridBooks } from '../../_components/grid-books'
import { NavigationHeader } from '../../_components/navigation-header'

import { useBooksFavorites } from '@/hooks/useBooksFavorites'
import { useBooksIsReading } from '@/hooks/useBooksIsReading'
import { useBooksReaded } from '@/hooks/useBooksReaded'

import { Loading } from '@/components/loading'
import { useAuth } from '@/hooks/useAuth'
import { Redirect, useFocusEffect } from 'expo-router'
import { systemStyles } from '../../_styles/styles'
import { styles } from './styles'

export default function Bookshelf() {
  const { user, isLoading, auth } = useAuth()
  const { booksIsReading, isLoadingBooksIsReading, getBooksIsReading } =
    useBooksIsReading()
  const { booksReaded, isLoadingBooksReaded, getBooksReaded } = useBooksReaded()
  const { favoriteBooks, isLoadingFavoriteBooks, getFavoriteBooks } =
    useBooksFavorites()

  const [selectedCategory, setSelectedCategory] = useState<
    'lidos' | 'favoritos'
  >('lidos')

  const handleCategoryPress = (category: 'lidos' | 'favoritos') => {
    setSelectedCategory(category)
  }

  useFocusEffect(
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useCallback(() => {
      auth()
      getBooksIsReading()
      getBooksReaded()
      getFavoriteBooks()
    }, [])
  )

  if (
    isLoading ||
    isLoadingBooksIsReading ||
    isLoadingBooksReaded ||
    isLoadingFavoriteBooks
  ) {
    return <Loading />
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />
  }

  function ReadedBooks() {
    const isEmpty =
      !booksIsReading?.length &&
      !booksReaded?.length &&
      !isLoadingBooksIsReading &&
      !isLoadingBooksReaded

    return (
      <>
        {booksIsReading?.length > 0 && (
          <FeaturedBooks title="Continuar lendo" data={booksIsReading} />
        )}

        {booksReaded?.length > 0 && (
          <GridBooks title="Livros lidos" data={booksReaded} />
        )}

        {isEmpty && (
          <View style={styles.emptyContainer}>
            <Image
              source={require('../../../../assets/logo_large.png')}
              style={styles.emptyImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>
              Você ainda não leu nenhum livro
            </Text>
          </View>
        )}
      </>
    )
  }

  function FavoriteBooks() {
    const isEmpty = !favoriteBooks?.length && !isLoadingFavoriteBooks

    return (
      <>
        {favoriteBooks?.length > 0 && (
          <GridBooks title="Favoritos" data={favoriteBooks} testID="favoritos-section" />
        )}

        {isEmpty && (
          <View style={styles.emptyContainer}>
            <Image
              source={require('../../../../assets/logo_large.png')}
              style={styles.emptyImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>
              Você ainda não possui nenhum livro favorito
            </Text>
          </View>
        )}
      </>
    )
  }

  return (
    <KeyboardAwareContainer>
      <View style={systemStyles.container}>
        <NavigationHeader />

        <View style={styles.buttonsContainer}>
          <CategoryButton
            title="Lidos"
            isSelected={selectedCategory === 'lidos'}
            onPress={() => handleCategoryPress('lidos')}
          />
          <CategoryButton
            title="Favoritos"
            isSelected={selectedCategory === 'favoritos'}
            onPress={() => handleCategoryPress('favoritos')}
          />
        </View>

        <View style={styles.body}>
          {selectedCategory === 'lidos' && <ReadedBooks />}
          {selectedCategory === 'favoritos' && <FavoriteBooks />}
        </View>
      </View>
    </KeyboardAwareContainer>
  )
}
