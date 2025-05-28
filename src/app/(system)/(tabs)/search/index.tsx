import { useCallback } from 'react'
import { Image, Text, View } from 'react-native'
import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'
import { GridBooks } from '@/components/grid-books'
import { NavigationHeader } from '../../_components/navigation-header'
import { SearchButton } from '../../_components/search-button'
import { systemStyles } from '../../_styles/styles'
import { styles } from './styles'
import { Loading } from '@/components/loading'
import { useAuth } from '@/hooks/useAuth'
import { useSearchBooks } from '@/hooks/useSearchBooks'
import { Redirect, useFocusEffect } from 'expo-router'

export default function Catalog() {
  const { user, isLoading, auth } = useAuth()
  const { isLoadingBooks, books, searchBooks } = useSearchBooks()

  async function handleSearchChange(title: string) {
    await searchBooks(title)
  }

  useFocusEffect(
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useCallback(() => {
      auth()
      searchBooks()
    }, [])
  )

  if (isLoading && isLoadingBooks) {
    return <Loading />
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />
  }

  return (
    <KeyboardAwareContainer>
      <View style={systemStyles.container}>
        <NavigationHeader />
        <View style={styles.body}>
          <SearchButton onChangeText={handleSearchChange} />
          {books.length > 0 ? (
            <GridBooks title="Livros" data={books} />
          ) : (
            <View style={styles.emptyContainer}>
              <Image
                source={require('../../../../assets/logo_large.png')}
                style={styles.emptyImage}
                resizeMode="contain"
              />
              <Text style={styles.emptyText}>Nenhum livro encontrado</Text>
            </View>
          )}
        </View>
      </View>
    </KeyboardAwareContainer>
  )
}
