import AsyncStorage from '@react-native-async-storage/async-storage'

import { RESET_PASSWORD_STORAGE } from '@/storage/storageConfig'

type StorageResetPasswordTokenProps = {
  resetPasswordToken: string
}

export async function storageResetPasswordTokenSave({
  resetPasswordToken,
}: StorageResetPasswordTokenProps) {
  await AsyncStorage.setItem(
    RESET_PASSWORD_STORAGE,
    JSON.stringify({ resetPasswordToken })
  )
}

export async function storageResetPasswordTokenGet() {
  const response = await AsyncStorage.getItem(RESET_PASSWORD_STORAGE)
  if (!response) {
    return { resetPasswordToken: '' }
  }

  const { resetPasswordToken }: StorageResetPasswordTokenProps =
    JSON.parse(response)

  return {
    resetPasswordToken: resetPasswordToken ?? '',
  }
}

export async function storageResetPasswordTokenRemove() {
  await AsyncStorage.removeItem(RESET_PASSWORD_STORAGE)
}
