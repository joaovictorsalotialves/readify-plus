import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'

import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'
import { CategoryButton } from '../../_components/category-button'
import { FeaturedBooks } from '../../_components/featured-books'
import { GridBooks } from '../../_components/grid-books'
import { NavigationHeader } from '../../_components/navigation-header'
import { SearchButton } from '../../_components/search-button'

import { useBookshelfBooks } from '@/hooks/useBookshelfBooks'

import { systemStyles } from '../../_styles/styles'
import { styles } from './styles'

export default function Bookshelf() {
  const [selectedCategory, setSelectedCategory] = useState<'lidos' | 'favoritos'>('lidos')

  const {
    booksReading,
    booksReaded,
    isLoadingBookshelf,
    getBookshelfBooks,
  } = useBookshelfBooks()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getBookshelfBooks()
  }, [])

  const isEmpty = !booksReading?.length && !booksReaded?.length && !isLoadingBookshelf

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

          {booksReading?.length > 0 && (
            <FeaturedBooks title="Continuar lendo" data={booksReading} />
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
        </View>
      </View>
    </KeyboardAwareContainer>
  )
}
