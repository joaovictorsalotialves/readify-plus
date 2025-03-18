export default function validadeConfirmationPassword(
  confirmationPassword: string,
  newPassword: string,
  setConfirmationPasswordError: React.Dispatch<React.SetStateAction<string>>
): boolean {
  if (confirmationPassword !== newPassword) {
    setConfirmationPasswordError('Confirmação de senha é diferente da senha!')
    return false
  }
  setConfirmationPasswordError('')
  return true
}
