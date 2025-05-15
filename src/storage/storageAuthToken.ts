import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_STORAGE } from '@/storage/storageConfig'

type StorageAuthTokenProps = {
  token: string
  refreshToken: string
}

export async function storageAuthTokenSave({
  token,
  refreshToken,
}: StorageAuthTokenProps) {
  await AsyncStorage.setItem(
    AUTH_STORAGE,
    JSON.stringify({ token, refreshToken })
  )
}

export async function storageAuthTokenGet() {
  const response = await AsyncStorage.getItem(AUTH_STORAGE)
  if (!response) {
    return { token: '', refreshToken: '' }
  }

  const { token, refreshToken }: StorageAuthTokenProps = JSON.parse(response)

  return {
    token: token ?? '',
    refreshToken: refreshToken ?? '',
  }
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_STORAGE)
}
