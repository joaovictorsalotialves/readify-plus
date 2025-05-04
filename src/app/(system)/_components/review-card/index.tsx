import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { StarRating } from '../../_components/star-rating'; // Importando o componente StarRating
import type { CommentData } from '@/utils/types/CommentData';

type Props = {
  review: CommentData;
};

export function ReviewCard({ review }: Props) {
  return (
    <View style={styles.reviewCard}>
      {/* FOTO + USERNAME */}
      <View style={styles.profileRow}>
        <Image
          source={{ uri: review.avatar }}
          style={styles.profilePicture}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{review.username}</Text>
        </View>
      </View>

      {/* Estrelas abaixo da imagem e do username */}
      <View style={styles.starRatingContainer}>
        <StarRating rating={review.rating} size={16} itemId={review.id} />
      </View>

      {/* TÍTULO E DATA */}
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewUsername}>{review.title}</Text>
        <Text style={styles.reviewDate}>{review.date}</Text>
      </View>

      {/* COMENTÁRIO */}
      <Text style={styles.reviewComment}>{review.comment}</Text>

      {/* BOTÃO DE COMPARTILHAR E LIKE */}
      <View style={styles.buttonContainer}>

        {/* Botão Like */}
        <TouchableOpacity style={styles.likeButton} activeOpacity={0.7}>
          <MaterialIcons name="thumb-up" size={16} style={styles.likeIcon} />
          <Text style={styles.likeText}>Like</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
