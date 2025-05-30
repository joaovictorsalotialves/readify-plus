import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { ResourceHeader } from '@/app/(system)/_components/resource-header';

export default function EditSenha() {
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const router = useRouter();

    function handleSave() {
        console.log('Alterar senha');
    }

    return (
        <View style={styles.container}>
            <ResourceHeader title="Editar Senha" icon="arrow-back" />

            <Text style={styles.label}>Senha atual</Text>
            <View style={styles.inputWrapper}>
                <Ionicons name="key-outline" size={18} color="#6F7D90" />
                <TextInput
                    style={styles.input}
                    placeholder="Senha atual"
                    placeholderTextColor="#95A1B1"
                    value={senhaAtual}
                    onChangeText={setSenhaAtual}
                    secureTextEntry
                />
            </View>

            <Text style={styles.label}>Nova senha</Text>
            <View style={styles.inputWrapper}>
                <Ionicons name="key-outline" size={18} color="#6F7D90" />
                <TextInput
                    style={styles.input}
                    placeholder="Nova senha"
                    placeholderTextColor="#95A1B1"
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                    secureTextEntry
                />
            </View>

            <Text style={styles.label}>Confirmação de senha</Text>
            <View style={styles.inputWrapper}>
                <Ionicons name="key-outline" size={18} color="#6F7D90" />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmação de senha"
                    placeholderTextColor="#95A1B1"
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.buttonBlue]}
                    onPress={handleSave}
                >
                    <Text style={styles.buttonText}>Alterar senha</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
