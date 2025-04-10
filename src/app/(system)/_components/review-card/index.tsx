import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import type { CommentData } from '@/utils/types/CommentData';

type Props = {
  review: CommentData;
};

export function ReviewCard({ review }: Props) {
  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewUsername}>{review.title}</Text>
        <Text style={styles.reviewDate}>27 de Novembro 2022</Text>
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
      <TouchableOpacity style={styles.shareButton}>
        <MaterialIcons name="share" size={16} style={styles.shareIcon} />
        <Text style={styles.shareText}>Compartilhar</Text>
      </TouchableOpacity>
    </View>
  );
}
