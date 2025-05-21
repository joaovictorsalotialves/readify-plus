import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'

import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'
import { CategoryButton } from '../../_components/category-button'
import { FeaturedBooks } from '../../_components/featured-books'
import { GridBooks } from '../../_components/grid-books'
import { NavigationHeader } from '../../_components/navigation-header'

import { useBooksIsReading } from '@/hooks/useBooksIsReading'
import { useBooksReaded } from '@/hooks/useBooksReaded'

import { systemStyles } from '../../_styles/styles'
import { styles } from './styles'

export default function Bookshelf() {
  const [selectedCategory, setSelectedCategory] = useState<
    'lidos' | 'favoritos'
  >('lidos')

  const { booksIsReading, isLoadingBooksIsReading, getBooksIsReading } =
    useBooksIsReading()

  const { booksReaded, isLoadingBooksReaded, getBooksReaded } = useBooksReaded()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getBooksIsReading()
    getBooksReaded()
  }, [])

  const handleCategoryPress = (category: 'lidos' | 'favoritos') => {
    setSelectedCategory(category)
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
    const favorites = []
    const isEmpty = favorites.length === 0

    return (
      <>
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
