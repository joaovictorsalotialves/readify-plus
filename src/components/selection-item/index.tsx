import { Text, TouchableOpacity } from 'react-native'

import { colors } from '@/styles/colors'
import { style } from './style'

type SelectionItemProps = {
  label: string
  onSelect: (value: string) => void
  isSelected: boolean
}

export function SelectionItem({
  label,
  onSelect,
  isSelected,
}: SelectionItemProps) {
  return (
    <TouchableOpacity
      style={[
        style.context,
        {
          backgroundColor: isSelected ? colors.blue : colors.gray[100],
        },
      ]}
      onPress={() => onSelect(label)}
    >
      <Text
        style={[
          style.label,
          {
            color: isSelected ? colors.gray[100] : colors.blue,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}
