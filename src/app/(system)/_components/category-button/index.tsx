import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from './styles';  // Defina estilos específicos para o botão

interface CategoryButtonProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({ title, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.selectedButton]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, isSelected && styles.selectedButtonText]}>
        {title}
      </Text>

    </TouchableOpacity>
  );
};
