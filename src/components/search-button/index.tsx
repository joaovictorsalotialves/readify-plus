import { Input } from '@/components/input'
import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { type TextInputProps, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'

type SearchButtonProps = TextInputProps

export function SearchButton({ onChangeText }: SearchButtonProps) {
  return (
    <View style={styles.searchFilterContainer}>
      <Input
        icon="search"
        onChangeText={onChangeText}
        placeholder="Search"
        testID="search-input"
      />
      <TouchableOpacity style={styles.filterButton}>
        <MaterialIcons name="filter-list" size={34} color={colors.blue} />
      </TouchableOpacity>
    </View>
  )
}
