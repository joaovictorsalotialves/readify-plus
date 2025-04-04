import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationHeader } from '../../_components/navigation-header';
import { CategoryButton } from '../../_components/category-button';
import { systemStyles } from '../../_styles/styles';
import { styles } from './styles';

export default function EmptyBookshelf() {
  const [selectedCategory, setSelectedCategory] = useState<'lidos' | 'favoritos'>('lidos');

  const handleCategoryPress = (category: 'lidos' | 'favoritos') => {
    setSelectedCategory(category);
  };

  return (
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

        {/* Tela vazia */}
        <View style={styles.emptyContainer}>
          <Image
            source={require('../../../../assets/logo_small.png')}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Text style={styles.emptyText}>Você ainda não leu nenhum livro</Text>
        </View>
      </View>
    </View>
  );
}
