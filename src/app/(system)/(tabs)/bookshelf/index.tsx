import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'

import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'
import { CategoryButton } from '../../_components/category-button'
import { FeaturedBooks } from '../../_components/featured-books'
import { GridBooks } from '../../_components/grid-books'
import { NavigationHeader } from '../../_components/navigation-header'
import { SearchButton } from '../../_components/search-button'

import { useBooksIsReading } from '@/hooks/useBooksIsReading'
import { useBooksReaded } from '@/hooks/useBooksReaded'


import { systemStyles } from '../../_styles/styles'
import { styles } from './styles'

export default function Bookshelf() {
  const [selectedCategory, setSelectedCategory] = useState<'lidos' | 'favoritos'>('lidos')

  const {
    booksIsReading,
    isLoadingBooksIsReading,
    getBooksIsReading,
  } = useBooksIsReading()

  const {
    booksReaded,
    isLoadingBooksReaded,
    getBooksReaded,
  } = useBooksReaded()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getBooksIsReading()
    getBooksReaded()
  }, [])

  const isEmpty =
    !booksIsReading?.length &&
    !booksReaded?.length &&
    !isLoadingBooksIsReading &&
    !isLoadingBooksReaded

  const handleCategoryPress = (category: 'lidos' | 'favoritos') => {
    setSelectedCategory(category)
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
          <SearchButton />

          {booksIsReading?.length > 0 && (
            <FeaturedBooks title="Continuar lendo" data={booksIsReading} />
          )}

          {selectedCategory === 'lidos' && booksReaded?.length > 0 && (
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
        </View>
      </View>
    </KeyboardAwareContainer>
  )
}
