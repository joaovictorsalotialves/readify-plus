import { regex } from '../regex'

export function validateCode(
  code: string,
  setCodeError: React.Dispatch<React.SetStateAction<string>>
): boolean {
  if (!code) {
    setCodeError('Código vazio!')
    return false
  }

  if (!regex.codeRegex.test(code)) {
    setCodeError('Formato do código inválido!')
    return false
  }

  setCodeError('')
  return true
}
