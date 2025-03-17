export function validatePassword(
  password: string,
  setPasswordError: React.Dispatch<React.SetStateAction<string>>
): boolean {
  if (!password) {
    setPasswordError('Senha vazia!')
    return false
  }
  setPasswordError('')
  return true
}
