import { regex } from '../regex'

export function validateEmail(
  email: string,
  setEmailError: React.Dispatch<React.SetStateAction<string>>
): boolean {
  if (!email) {
    setEmailError('Email vazio!')
    return false
  }
  if (!regex.emailRegex.test(email)) {
    setEmailError('Email inválido!')
    return false
  }
  setEmailError('')
  return true
}
