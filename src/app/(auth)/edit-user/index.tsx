import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { ResourceHeader } from '@/app/(system)/_components/resource-header';

export default function EditUser() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const router = useRouter();

  function handleSave() {
    console.log('Salvar alterações');
  }

  function handleChangePassword() {
    console.log('Alterar senha');
  }

  function handleChangeMode() {
    console.log('Alterar modo leitura');
  }

  return (
    <View style={styles.container}>
      {/* ✅ Cabeçalho de recursos */}
      <ResourceHeader title="Editar Perfil" icon="arrow-back" />

      <View style={styles.avatarContainer}>
        <TouchableOpacity style={styles.avatar}>
          <Ionicons name="pencil" size={28} color="#6F7D90" />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#95A1B1"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#95A1B1"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#95A1B1"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonOrange]}
          onPress={handleChangePassword}
        >
          <Text style={styles.buttonText}>Alterar senha</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonOrange]}
          onPress={handleChangeMode}
        >
          <Text style={styles.buttonText}>Alterar modo leitura</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonBlue]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Salvar alterações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
