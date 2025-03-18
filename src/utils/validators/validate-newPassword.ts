import { z } from 'zod'

import { regex } from '../regex'

const newPasswordSchema = z
  .string()
  .min(8, 'A senha precisa ter no mínimo 8 caracteres.')
  .regex(regex.hasLetterRegex, 'A senha deve conter pelo menos uma letra.')
  .regex(regex.hasNumberRegex, 'A senha deve conter pelo menos um número.')
  .regex(
    regex.hasSpecialCharRegex,
    'A senha deve conter pelo menos um caractere especial.'
  )

export default function validadeNewPassword(
  newPassword: string,
  setNewPasswordError: React.Dispatch<React.SetStateAction<string>>
): boolean {
  try {
    newPasswordSchema.parse(newPassword)
    setNewPasswordError('')
    return true
  } catch (error) {
    if (error instanceof z.ZodError) {
      const allErrors = error.errors.map(error => error.message).join('\n')
      setNewPasswordError(allErrors)
    }
    return false
  }
}
