import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationHeader } from '../../_components/navigation-header';
import { StarRating } from '../../_components/star-rating';
import { colors } from '@/styles/colors';
import { systemStyles } from '../../_styles/styles';
import { styles } from './styles';

const book = {
  rating:0,
};

export default function Home() {
  const [comment, setComment] = useState('');

  return (
    <View style={systemStyles.container}>
      <NavigationHeader />

      <View style={styles.customHeader}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={colors.gray[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Avaliação: Título do Livro
        </Text>
      </View>

      <View style={styles.customHeader}>
        <Text style={styles.linkLabel}>Qual nota você avaliaria o livro</Text>
        <StarRating rating={book.rating} />
      </View>

      <View style={styles.customHeader}>
        <Text style={styles.linkLabel}>Comentário (opcional)</Text>
        <TextInput
          value={comment}
          onChangeText={setComment}
          placeholder="Comentário..."
          multiline
          style={styles.textArea}
        />
      </View>
    </View>
  );
}
