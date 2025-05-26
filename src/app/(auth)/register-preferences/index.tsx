import { router } from 'expo-router'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { AuthHeader } from '@/components/auth-header'
import { Button } from '@/components/button'
import { KeyboardAwareContainer } from '@/components/keyboard-aware-container'

import { authStyles } from '../_styles/styles'

// --- Componente interno de item selecionável ---
const SelectionItem = ({
  label,
  onSelect,
  isSelected,
}: {
  label: string
  onSelect: (value: string) => void
  isSelected: boolean
}) => (
  <TouchableOpacity
    style={[
      { padding: 10, margin: 6, borderWidth: 1, borderRadius: 6 },
      { backgroundColor: isSelected ? 'blue' : 'white', borderColor: 'blue' },
    ]}
    onPress={() => onSelect(label)}
  >
    <Text
      style={{
        color: isSelected ? 'white' : 'blue',
        fontSize: 16,
        fontWeight: '500',
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
)

// --- Componente interno de seleção de gênero e escritor ---
const GenderWriterSelector = ({
  selectedGenre,
  selectedWriter,
  onSelectGenre,
  onSelectWriter,
}: {
  selectedGenre: string[]
  selectedWriter: string[]
  onSelectGenre: (item: string) => void
  onSelectWriter: (item: string) => void
}) => {
  const genres = ['Ficção', 'Romance', 'Fantasia', 'Suspense']
  const writers = [
    'Machado de Assis',
    'Clarice Lispector',
    'J.K. Rowling',
    'Stephen King',
  ]

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Gêneros
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {genres.map(genre => (
          <SelectionItem
            key={genre}
            label={genre}
            onSelect={onSelectGenre}
            isSelected={selectedGenre.includes(genre)}
          />
        ))}
      </View>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 20 }}>
        Escritores
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
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

// --- Tela principal ---
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

    console.log('Gêneros:', selectedGenre)
    console.log('Escritores:', selectedWriter)

    router.navigate('/')
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
              onPress={() => router.navigate('/(auth)/register-user/index')}
            />
          </View>
        </View>
      </View>
    </KeyboardAwareContainer>
  )
}
