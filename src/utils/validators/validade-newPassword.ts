import { regex } from '../regex'

export default function validadeNewPassword(
  newPassword: string,
  setNewPasswordError: React.Dispatch<React.SetStateAction<string>>
): boolean {
  if (!newPassword) {
    setNewPasswordError('Nova senha vázia!')
    return false
  }

  if (!regex.passwordRegex.test(newPassword)) {
    setNewPasswordError(
      'Formato da senha inválido! A senha deve ter no mínimo 8 caracteres e incluir pelo menos uma letra, um número e um caractere especial.'
    )
    return false
  }

  setNewPasswordError('')
  return true
}
