import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native'
import { styles } from './styles'

type CategoryButtonProps = TouchableOpacityProps & {
  title: string
  isSelected: boolean
}

export function CategoryButton({
  title,
  isSelected,
  onPress,
  ...rest
}: CategoryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.selectedButton]}
      onPress={onPress}
      {...rest}
    >
      <Text
        style={[styles.buttonText, isSelected && styles.selectedButtonText]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}
