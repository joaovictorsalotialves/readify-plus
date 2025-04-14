import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StarRating } from '../../_components/star-rating';
import { StatItem } from '../../_components/stat-item';
import { ReviewCard } from '../../_components/review-card';
import { NavigationHeader } from '../../_components/navigation-header';
import { styles } from '@/app/(system)/(tabs)/detailsbook/styles';
import { colors } from '@/styles/colors';
import type { CommentData } from '@/utils/types/CommentData';
import { books } from '@/utils/mocks/books';
import { Input } from '@/components/input';
import { FeaturedBooks } from '../../_components/featured-books';

const book = {
  id: '1',
  title: 'Dom Quixote',
  author: 'Miguel de Cervantes',
  rating: 4.7,
  reads: 325,
  visits: 1024,
  shares: 89,
  reviews: 156,
  genre: 'Romance',
  publisher: 'Editora Fantástica',
  pages: 863,
  language: 'Português',
  isbn: '978-85-123-4567-0',
  description: 'A clássica história do cavaleiro sonhador e seu fiel escudeiro...',
  coverImage: 'https://exemplo.com/capa.jpg'
};

const reviews: CommentData[] = [
  {
    id: '1',
    username: 'LeitorAssíduo',
    date: '27 de novembro 2022',
    comment: 'Uma obra-prima da literatura mundial!',
    title: book.title,
    cover: book.coverImage,
    rating: 4.5,
    avatar: 'https://exemplo.com/avatar1.jpg'
  },
  {
    id: '2',
    username: 'CríticoLiterário',
    date: '15 de janeiro 2023',
    comment: 'Narrativa rica e personagens inesquecíveis.',
    title: book.title,
    cover: book.coverImage,
    rating: 4.8,
    avatar: 'https://exemplo.com/avatar2.jpg'
  },
  {
    id: '3',
    username: 'MariaLuz',
    date: '10 de março 2023',
    comment: 'Muito interessante, mas um pouco longo pra mim.',
    title: book.title,
    cover: book.coverImage,
    rating: 4.0,
    avatar: 'https://exemplo.com/avatar3.jpg'
  },
  {
    id: '4',
    username: 'JoãoCultura',
    date: '21 de abril 2023',
    comment: 'Simplesmente genial! Leitura obrigatória.',
    title: book.title,
    cover: book.coverImage,
    rating: 5.0,
    avatar: 'https://exemplo.com/avatar4.jpg'
  }
];

export default function BookDetailsScreen() {
  const [link, setLink] = useState('');
  const [currentReviewPage, setCurrentReviewPage] = useState(2);
  const reviewsPerPage = 1;
  const maxPages = Math.ceil(reviews.length / reviewsPerPage);

  const handleEnviarLink = () => {
    console.log('Link enviado:', link);
  };

  return (
    <View style={styles.container}>
      <NavigationHeader />

      {/* Header Personalizado */}
      <View style={styles.customHeader}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={colors.gray[800]} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle} numberOfLines={1}>{book.title}</Text>
        
        <TouchableOpacity style={styles.likeButton}>
          <MaterialIcons name="favorite-border" size={24} color={colors.gray[800]} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Seção Capa e Informações */}
        <View style={styles.coverContainer}>
          <Image 
            source={{ uri: book.coverImage }} 
            style={styles.bookCover} 
            resizeMode="cover"
          />
          <View style={styles.bookInfo}>
            <Text style={styles.label}>Título Livro</Text>
            <Text style={styles.value}>{book.title}</Text>
            
            <Text style={styles.label}>Nome Escritor</Text>
            <Text style={styles.value}>{book.author}</Text>
            
            <Text style={styles.label}>Avaliação</Text>
            <StarRating rating={book.rating} />
          </View>
        </View>

        {/* Seção Ler Livro */}
        <View style={styles.readSection}>
          <TouchableOpacity style={styles.readButton}>
            <Text style={styles.readButtonText}>Ler Livro</Text>
          </TouchableOpacity>
          <View style={styles.linkButton}>
            <Input
              icon="link"
              isFilled
              placeholder="Link do Livro"
              value={link}
              onChangeText={setLink}
              rightIcon={
                <TouchableOpacity onPress={handleEnviarLink}>
                  <MaterialIcons name="arrow-forward" size={20} color={colors.gray[100]} />
                </TouchableOpacity>
              }
            />
          </View>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsGrid}>
          <StatItem label="Nº Leituras" value={book.reads} />
          <StatItem label="Nº Avaliações" value={book.reviews} />
          <StatItem label="Nº Visitas" value={book.visits} />
          <StatItem label="Nº Compartilhamentos" value={book.shares} />
        </View>

        {/* Informações do Livro */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações sobre o Livro</Text>
          <Text style={styles.label}>Sinopse</Text>
          <Text style={styles.bookDescription}>{book.description}</Text>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Gênero: </Text>{book.genre}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Editora: </Text>{book.publisher}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Nº Páginas: </Text>{book.pages}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Idiomas: </Text>{book.language}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>ISBN: </Text>{book.isbn}</Text>
          </View>
        </View>

        {/* Avaliações com Paginação */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avaliações ({book.reviews})</Text>

          {reviews
            .slice((currentReviewPage - 1) * reviewsPerPage, currentReviewPage * reviewsPerPage)
            .map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
            {Array.from({ length: maxPages }).map((_, index) => {
              const pageNumber = index + 1;
              const isActive = currentReviewPage === pageNumber;

              return (
                <TouchableOpacity
                  key={`page-${pageNumber}`}
                  onPress={() => setCurrentReviewPage(pageNumber)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    marginHorizontal: 4,
                    borderRadius: 8,
                    backgroundColor: isActive ? colors.orange[500] : colors.gray[300],
                  }}
                >
                  <Text style={{ color: isActive ? 'black' : colors.gray[800], fontWeight: 'bold' }}>
                    {pageNumber}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Livros Recomendados */}
        <View style={styles.section}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.contextGallery}>
              <FeaturedBooks title="Recomendados para você" data={books.slice(0, 3)} />
              <FeaturedBooks title="Títulos Semelhantes" data={books} />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
