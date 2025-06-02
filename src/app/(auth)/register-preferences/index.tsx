import { router, useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import { Alert, Text, View } from 'react-native'

import { AuthHeader } from '@/components/auth-header'
import { Button } from '@/components/button'
import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'
import { SelectionItem } from '@/components/selection-item'

import { Loading } from '@/components/loading'
import type { RegisterBodyDTO } from '@/dtos/register-user-dto'
import { useBookCategories } from '@/hooks/useBookCategories'
import { useRegister } from '@/hooks/useRegister'
import { useWriters } from '@/hooks/useWriters'
import { AxiosError } from 'axios'
import { authStyles } from '../_styles/styles'
import { styles } from './styles'

type GenderWriterSelectorProps = {
  selectedGenre: string[]
  selectedWriter: string[]
  onSelectGenre: (item: string) => void
  onSelectWriter: (item: string) => void
}

export default function RegisterPreference() {
  const { setPreferences, registerData, register } = useRegister()
  const { isLoadingWriters, writers, getWriters } = useWriters()
  const { isLoadingBookCategories, bookCategories, getBookCategories } =
    useBookCategories()

  const [selectedGenre, setSelectedGenre] = useState<string[]>([])
  const [selectedWriter, setSelectedWriter] = useState<string[]>([])

  const handleSelectGenre = (genre: string) => {
    setSelectedGenre(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    )

    setPreferences(selectedGenre, selectedWriter)
  }

  const handleSelectWriter = (writer: string) => {
    setSelectedWriter(prev =>
      prev.includes(writer) ? prev.filter(w => w !== writer) : [...prev, writer]
    )

    setPreferences(selectedGenre, selectedWriter)
  }

  const handleSubmit = async () => {
    if (selectedGenre.length < 2 || selectedWriter.length < 2) {
      Alert.alert('Por favor, selecione pelo dois gênero e dois escritor!')
      return
    }

    setPreferences(selectedGenre, selectedWriter)

    try {
      await register(registerData as RegisterBodyDTO)
      router.replace('/(system)/(tabs)/home')
    } catch (err) {
      const isAppError = err instanceof AxiosError
      const title =
        isAppError && err.response?.data.message
          ? err.response.data.message
          : 'Não foi possivel cadastrar o usuário. Tente novamente'

      Alert.alert(title)
    }
  }

  useFocusEffect(
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useCallback(() => {
      getWriters()
      getBookCategories()
    }, [])
  )

  if (isLoadingWriters || isLoadingBookCategories) {
    return <Loading />
  }

  function GenderWriterSelector({
    selectedGenre,
    selectedWriter,
    onSelectGenre,
    onSelectWriter,
  }: GenderWriterSelectorProps) {
    return (
      <View>
        <Text style={styles.subtitle}>Gêneros</Text>
        <View style={styles.context}>
          {bookCategories.map(bookCategories => (
            <SelectionItem
              key={bookCategories.id}
              label={bookCategories.name}
              onSelect={() => onSelectGenre(bookCategories.id)}
              isSelected={selectedGenre.includes(bookCategories.id)}
            />
          ))}
        </View>

        <Text style={styles.subtitle}>Escritores</Text>
        <View style={styles.context}>
          {writers.map(writer => (
            <SelectionItem
              key={writer.id}
              label={writer.name}
              onSelect={() => onSelectWriter(writer.id)}
              isSelected={selectedWriter.includes(writer.id)}
            />
          ))}
        </View>
      </View>
    )
  }

  return (
    <KeyboardAwareContainer>
      <View style={authStyles.container}>
        <AuthHeader backRoute="/(auth)/register-user" />

        <View style={authStyles.body}>
          <Text style={authStyles.title}>Cadastrar-se</Text>
          <Text style={authStyles.subtitle}>
            Escolha seus gêneros e escritores favoritos:
          </Text>

          <GenderWriterSelector
            selectedGenre={selectedGenre}
            selectedWriter={selectedWriter}
            onSelectGenre={handleSelectGenre}
            onSelectWriter={handleSelectWriter}
          />

          <View style={authStyles.context}>
            <Button
              testID="button-register"
              text="Cadastrar-se"
              type="confirm"
              onPress={handleSubmit}
            />
            <Button
              text="Voltar"
              type="redirect"
              onPress={() => router.back()}
            />
          </View>
        </View>
      </View>
    </KeyboardAwareContainer>
  )
}
