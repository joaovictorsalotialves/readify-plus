import { useEffect, useState } from 'react'

import { View } from 'react-native'

import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'
import { GridBooks } from '../../_components/grid-books'
import { NavigationHeader } from '../../_components/navigation-header'
import { SearchButton } from '../../_components/search-button'

import { systemStyles } from '../../_styles/styles'
import { styles } from './styles'

import { Loading } from '@/components/loading'
import { useAuth } from '@/hooks/useAuth'
import { useSearchBooks } from '@/hooks/useSearchBooks'

export default function Catalog() {
  const { isLoading, auth } = useAuth()
  const { isLoadingBooks, books, searchBooks } = useSearchBooks()

  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [writerId, setWriterId] = useState('')

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    auth()
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    searchBooks(title, categoryId, writerId)
  }, [title, categoryId, writerId])

  if (isLoading && isLoadingBooks) {
    return <Loading />
  }

  return (
    <KeyboardAwareContainer>
      <View style={systemStyles.container}>
        <NavigationHeader />

        <View style={styles.body}>
          <SearchButton />

          {<GridBooks title="Livros" data={books} />}
        </View>
      </View>
    </KeyboardAwareContainer>
  )
}
