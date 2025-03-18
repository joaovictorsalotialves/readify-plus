import { z } from 'zod'

import { regex } from '../regex'

const codeSchema = z
  .string()
  .regex(
    regex.codeRegex,
    'Formato inválido. O código deve ter exatamente 6 números.'
  )

export function validateCode(
  code: string,
  setCodeError: React.Dispatch<React.SetStateAction<string>>
): boolean {
  try {
    codeSchema.parse(code)
    setCodeError('')
    return true
  } catch (error) {
    if (error instanceof z.ZodError) {
      setCodeError(error.errors[0].message)
    }
    return false
  }
}
