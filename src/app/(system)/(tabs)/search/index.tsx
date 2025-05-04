import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { Input } from '@/components/input';
import { NavigationHeader } from '../../_components/navigation-header';
import { SearchButton } from '../../_components/search-button'

import { styles } from './styles';
import { colors } from '@/styles/colors';

export default function CatalogScreen() {
  const [activeTab, setActiveTab] = useState<string>('search'); // Estado para o ícone ativo

  const items = [
    { icon: 'local-offer', label: 'Escritor' },
    { icon: 'menu-book', label: 'Livro' },
    { icon: 'person', label: 'User' },
    { icon: 'menu-book', label: 'Livro' },
    { icon: 'local-offer', label: 'Escritor' },
    { icon: 'menu-book', label: 'Livro' },
    { icon: 'person', label: 'User' },
    { icon: 'local-offer', label: 'Escritor' },
  ];

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <NavigationHeader />

      {/* Search bar */}
      <View style={styles.body}>
        <SearchButton />
      </View>

      {/* Lista de categorias */}
      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="handled">
        {items.map((item, index) => (
          <View key={`${item.label}-${index}`} style={styles.itemRow}>
            <MaterialIcons name={item.icon as keyof typeof MaterialIcons.glyphMap} size={24} color={colors.gray[400]} />
            <Text style={styles.itemLabel}>{item.label}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Botão catálogo */}
      <View style={styles.catalogButtonWrapper}>
        <TouchableOpacity style={styles.catalogButton}>
          <Text style={styles.catalogButtonText}>
            Conferir Catálogo Completo
          </Text>
        </TouchableOpacity>
      </View>

    
    </View>
  );
}
