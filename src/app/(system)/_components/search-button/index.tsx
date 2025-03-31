import React from 'react';
import { TouchableOpacity, Text, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/styles/colors';
import { styles } from './styles';

const SearchButton: React.FC = () => {
  return (
    <View style={styles.searchFilterContainer}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color={colors.gray[400]} style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor={colors.gray[400]}
        />
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <MaterialIcons name="filter-list" size={34} color={colors.blue} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchButton;  // Exportação padrão
