import AsyncStorage from '@react-native-async-storage/async-storage'

import { RECOVERY_PASSWORD_STORAGE } from '@/storage/storageConfig'

type StorageRecoveryPasswordTokenProps = {
  recoveryPasswordToken: string
}

export async function storageRecoveryPasswordTokenSave({
  recoveryPasswordToken,
}: StorageRecoveryPasswordTokenProps) {
  await AsyncStorage.setItem(
    RECOVERY_PASSWORD_STORAGE,
    JSON.stringify({ recoveryPasswordToken })
  )
}

export async function storageRecoveryPasswordTokenGet() {
  const response = await AsyncStorage.getItem(RECOVERY_PASSWORD_STORAGE)
  if (!response) {
    return { recoveryPasswordToken: '' }
  }

  const { recoveryPasswordToken }: StorageRecoveryPasswordTokenProps =
    JSON.parse(response)

  return {
    recoveryPasswordToken: recoveryPasswordToken ?? '',
  }
}

export async function storageRecoveryPasswordTokenRemove() {
  await AsyncStorage.removeItem(RECOVERY_PASSWORD_STORAGE)
}
