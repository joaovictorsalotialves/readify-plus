import React, { useState } from 'react'

import { View } from 'react-native'

import { CategoryButton } from '../../_components/category-button'
import { FeaturedBooks } from '../../_components/featured-books'
import { NavigationHeader } from '../../_components/navigation-header'
import { SearchButton } from '../../_components/search-button'
import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'
import { GridBooks } from '../../_components/grid-books'

import { systemStyles } from '../../_styles/styles'
import { styles } from './styles'

import { books } from '@/utils/mocks/books'

export default function Bookshelf() {
  const [selectedCategory, setSelectedCategory] = useState<
    'lidos' | 'favoritos'
  >('lidos')

  const handleCategoryPress = (category: 'lidos' | 'favoritos') => {
    setSelectedCategory(category)
  }

  return (
    <KeyboardAwareContainer>
      <View style={systemStyles.container}>
        <NavigationHeader />
        <View style={styles.body}>
          {/* Botões Lidos e Favoritos */}
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

          {/* Barra de pesquisa */}
          <SearchButton />


          {/* Livros Continuar Lendo */}
          <FeaturedBooks title="Continuar lendo" data={books} />

          {/* Livros Lidos */}
          <GridBooks title="Livros lidos" data={books} />
        </View>
      </View>
    </KeyboardAwareContainer>
  )
}
