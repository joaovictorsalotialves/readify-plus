import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

import { ResourceHeader } from '../../_components/resource-header';
import { StarRating } from '../../_components/star-rating';

import { systemStyles } from '../../_styles/styles';
import { styles } from './styles';

export default function Home() {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(3); // Estado controlado da avaliação

  const handleSubmit = () => {
    console.log('Enviando avaliação...');
    console.log('Nota:', rating);
    console.log('Comentário:', comment);
    // Aqui pode enviar para uma API ou outro destino
  };

  return (
    <View style={systemStyles.container}>
      <ResourceHeader title="Avaliação: Título do livro" icon="arrow-back" />

      <View style={styles.customHeader}>
        <Text style={styles.linkLabel}>Qual nota você avaliaria o livro</Text>
        <StarRating rating={rating} onChangeRating={setRating} />
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

      <View style={styles.readSection}>
        <TouchableOpacity style={styles.readButton} onPress={handleSubmit}>
          <Text style={styles.readButtonText}>Enviar Comentário</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
