import { z } from 'zod'

const passwordSchema = z.string().nonempty('Senha obrigatória!')

export function validatePassword(
  password: string,
  setPasswordError: React.Dispatch<React.SetStateAction<string>>
): boolean {
  try {
    passwordSchema.parse(password)
    setPasswordError('')
    return true
  } catch (error) {
    if (error instanceof z.ZodError) {
      const allErrors = error.errors.map(error => error.message).join('\n')
      setPasswordError(allErrors)
    }
    return false
  }
}
