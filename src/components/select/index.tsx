import { Text, TouchableOpacity, View } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'

import { styles } from './styles'

type SelectProps = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data: Array<any>
  value: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onSelect: (selectedItem: any, index: number) => void
}

export function Select({ data, onSelect, value }: SelectProps) {
  return (
    <SelectDropdown
      data={data}
      defaultValue={value}
      onSelect={onSelect}
      renderButton={selectedItem => (
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            {selectedItem || 'Selecione uma opção'}
          </Text>
        </TouchableOpacity>
      )}
      renderItem={(item, index, isSelected) => (
        <View style={[styles.item, isSelected && styles.selectedItem]}>
          <Text style={styles.itemText}>{item}</Text>
        </View>
      )}
      dropdownStyle={styles.dropdown}
    />
  )
}
