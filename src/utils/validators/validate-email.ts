import { z } from 'zod'

const emailSchema = z
  .string()
  .nonempty('E-mail obrigatório!')
  .email('E-mail inválido!')

export function validateEmail(
  email: string,
  setEmailError: React.Dispatch<React.SetStateAction<string>>
) {
  try {
    emailSchema.parse(email)
    setEmailError('')
    return true
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      setEmailError(error.errors[0].message)
    }
    return false
  }
}
