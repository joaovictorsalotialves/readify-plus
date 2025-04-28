import { router } from 'expo-router';
import { useState } from 'react';
import { Keyboard, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { KeyboardAwareContainer } from '@/components/keyboard-aware-container';
import { Header } from '../_components/header';

import { validateEmail } from '@/utils/validators/validate-email';
import { authStyles } from '../_styles/styles';

// --- Componente de seleção de gênero/escritores ---

interface SelectionItemProps {
  label: string;
  onSelect: (value: string) => void;
  isSelected: boolean;
}

const SelectionItem: React.FC<SelectionItemProps> = ({ label, onSelect, isSelected }) => {
  return (
    <TouchableOpacity
      style={[
        selectorStyles.itemContainer,
        isSelected ? selectorStyles.selected : selectorStyles.unselected,
      ]}
      onPress={() => onSelect(label)}
    >
      <Text
        style={[
          selectorStyles.itemText,
          isSelected ? selectorStyles.selectedText : selectorStyles.unselectedText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const GenderWriterSelector = ({
  selectedGenre,
  selectedWriter,
  onSelectGenre,
  onSelectWriter,
}: {
  selectedGenre: string;
  selectedWriter: string;
  onSelectGenre: (item: string) => void;
  onSelectWriter: (item: string) => void;
}) => {
  const genres = ['Ficção', 'Romance', 'Fantasia', 'Suspense'];
  const writers = ['Machado de Assis', 'Clarice Lispector', 'J.K. Rowling', 'Stephen King'];

  return (
    <View style={selectorStyles.container}>
      <Text style={selectorStyles.sectionTitle}>Gêneros</Text>
      <View style={selectorStyles.optionsContainer}>
        {genres.map((genre) => (
          <SelectionItem
            key={genre}
            label={genre}
            onSelect={onSelectGenre}
            isSelected={selectedGenre === genre}
          />
        ))}
      </View>

      <Text style={[selectorStyles.sectionTitle, { marginTop: 20 }]}>Escritores</Text>
      <View style={selectorStyles.optionsContainer}>
        {writers.map((writer) => (
          <SelectionItem
            key={writer}
            label={writer}
            onSelect={onSelectWriter}
            isSelected={selectedWriter === writer}
          />
        ))}
      </View>
    </View>
  );
};

// --- Sua TELA de Cadastro de Preferências ---
export default function RegisterPreference() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedWriter, setSelectedWriter] = useState('');

  const handleSelectGenre = (genre: string) => {
    setSelectedGenre(genre);
  };

  const handleSelectWriter = (writer: string) => {
    setSelectedWriter(writer);
  };

  const handleSubmit = () => {
    if (!selectedGenre || !selectedWriter) {
      alert('Por favor, selecione um gênero e um escritor!');
      return;
    }
    // Depois você pode salvar essas informações aqui
    router.navigate('/');
  };

  return (
    <KeyboardAwareContainer>
      <View style={authStyles.container}>
        <Header backRoute="/register-user" />

        <View style={authStyles.body}>
          <Text style={authStyles.title}>Cadastrar-se</Text>
          <Text style={authStyles.subtitle}>Informe seu gênero e escritores favoritos:</Text>

          {/* Seletor de gênero e escritores */}
          <GenderWriterSelector
            selectedGenre={selectedGenre}
            selectedWriter={selectedWriter}
            onSelectGenre={handleSelectGenre}
            onSelectWriter={handleSelectWriter}
          />

          <View style={authStyles.context}>
            <Button text="Continuar" type="confirm" onPress={handleSubmit} />
            <Button text="Já tenho conta" type="redirect" onPress={() => router.navigate('/login')} />
          </View>
        </View>
      </View>
    </KeyboardAwareContainer>
  );
}

// --- Estilos do seletor ---
const selectorStyles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 6,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  unselected: {
    backgroundColor: 'white',
    borderColor: 'blue',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectedText: {
    color: 'white',
  },
  unselectedText: {
    color: 'blue',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
});
