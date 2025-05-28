import { router } from 'expo-router'
import { useState } from 'react'
import { Text, View } from 'react-native'

import { AuthHeader } from '@/components/auth-header'
import { Button } from '@/components/button'
import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'
import { SelectionItem } from '@/components/selection-item'

import { authStyles } from '../_styles/styles'
import { styles } from './styles'

type GenderWriterSelectorProps = {
  selectedGenre: string[]
  selectedWriter: string[]
  onSelectGenre: (item: string) => void
  onSelectWriter: (item: string) => void
}

export default function RegisterPreference() {
  const [selectedGenre, setSelectedGenre] = useState<string[]>([])
  const [selectedWriter, setSelectedWriter] = useState<string[]>([])

  const handleSelectGenre = (genre: string) => {
    setSelectedGenre(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    )
  }

  const handleSelectWriter = (writer: string) => {
    setSelectedWriter(prev =>
      prev.includes(writer) ? prev.filter(w => w !== writer) : [...prev, writer]
    )
  }

  const handleSubmit = () => {
    if (selectedGenre.length === 0 || selectedWriter.length === 0) {
      alert('Por favor, selecione pelo menos um gênero e um escritor!')
      return
    }
  }

  function GenderWriterSelector({
    selectedGenre,
    selectedWriter,
    onSelectGenre,
    onSelectWriter,
  }: GenderWriterSelectorProps) {
    const genres = ['Ficção', 'Romance', 'Fantasia', 'Suspense']
    const writers = [
      'Machado de Assis',
      'Clarice Lispector',
      'J.K. Rowling',
      'Stephen King',
    ]

    return (
      <View>
        <Text style={styles.subtitle}>Gêneros</Text>
        <View style={styles.context}>
          {genres.map(genre => (
            <SelectionItem
              key={genre}
              label={genre}
              onSelect={onSelectGenre}
              isSelected={selectedGenre.includes(genre)}
            />
          ))}
        </View>

        <Text style={styles.subtitle}>Escritores</Text>
        <View style={styles.context}>
          {writers.map(writer => (
            <SelectionItem
              key={writer}
              label={writer}
              onSelect={onSelectWriter}
              isSelected={selectedWriter.includes(writer)}
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
            <Button text="Cadastrar-se" type="confirm" onPress={handleSubmit} />
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
