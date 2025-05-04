import React, { useState } from 'react'
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { NavigationHeader } from '../../_components/navigation-header'
import { StarRating } from '../../_components/star-rating'

import { systemStyles } from '../../_styles/styles'
import { styles } from './styles'

import { colors } from '@/styles/colors'
import { comments as initialComments } from '@/utils/mocks/comments'
import type { CommentData } from '@/utils/types/CommentData'

export default function Profile() {
  const [comments, setComments] = useState<CommentData[]>(initialComments)

  const hasComments = comments.length > 0

  return (
    <View style={systemStyles.container}>
      <NavigationHeader />

      <FlatList
        data={comments}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            {/* Imagem do perfil */}
            <View style={styles.profilePicture}>
              <Image
                source={{ uri: 'https://via.placeholder.com/100' }}
                style={styles.image}
              />
              <TouchableOpacity
                style={styles.settingsButton}
                accessibilityLabel="Abrir configurações"
              >
                <MaterialIcons name="settings" color={colors.blue} size={32} />
              </TouchableOpacity>
            </View>

            {/* Nome e botão de configurações */}
            <View style={styles.userInfo}>
              <Text style={styles.username}>Username</Text>
            </View>

            {/* Estatísticas */}
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Text style={styles.statInfo}>100</Text>
                <Text style={styles.statLabel}>Livros Lidos</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statInfo}>{comments.length}</Text>
                <Text style={styles.statLabel}>Comentários</Text>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Image
              source={require('@/assets/logo_large.png')}
              style={styles.emptyImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>
              Você ainda não comentou nenhum livro
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <View style={styles.bookCoverContainer}>
              <Image
                source={{ uri: item.cover }}
                style={styles.bookCover}
              />
              <Text style={styles.bookTitle}>{item.title}</Text>
            </View>

            <View style={styles.bookInfo}>
              <View style={styles.bookInfoHeader}>
                <StarRating rating={item.rating ?? 0} itemId={item.id} />
                <TouchableOpacity
                  style={styles.moreOptionsButton}
                  accessibilityLabel="Mais opções"
                >
                  <MaterialIcons
                    name="more-horiz"
                    color={colors.gray[900]}
                    size={32}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.bookDate}>27 de Fevereiro 2025</Text>
              <Text style={styles.bookDescription}>Why do we use it?</Text>
              <Text style={styles.bookDescription}>It’s a long established fact.</Text>
              <Text style={styles.bookDescription}>Why do we use it?</Text>
              <Text style={styles.bookDescription}>It’s a long established fact.</Text>
            </View>
          </View>
        )}
      />
    </View>
  )
}
