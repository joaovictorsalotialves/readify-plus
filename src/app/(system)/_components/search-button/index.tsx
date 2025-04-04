import React from 'react';
import { TouchableOpacity, Text, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/styles/colors';
import { styles } from './styles';
import { Input } from '@/components/input';

export function SearchButton() {
  return (
    <View style={styles.searchFilterContainer}>
      <Input icon='search' isFilled placeholder='Search' />
      <TouchableOpacity style={styles.filterButton}>
        <MaterialIcons name="filter-list" size={34} color={colors.blue} />
      </TouchableOpacity>
    </View>
  );
};

