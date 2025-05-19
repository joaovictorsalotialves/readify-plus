import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  storageRecoveryPasswordTokenGet,
  storageRecoveryPasswordTokenRemove,
  storageRecoveryPasswordTokenSave,
} from '@/storage/storageRecoveryPasswordToken'

import { RECOVERY_PASSWORD_STORAGE } from '@/storage/storageConfig'

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}))

const mockData = {
  recoveryPasswordToken: 'mocked-recovery-token',
}

describe('storageRecoveryPasswordToken', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it('should save the recovery password token to AsyncStorage', async () => {
    await storageRecoveryPasswordTokenSave(mockData)

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      RECOVERY_PASSWORD_STORAGE,
      JSON.stringify(mockData)
    )
  })

  it('should get the recovery password token from AsyncStorage', async () => {
    ;(AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(mockData)
    )

    const response = await storageRecoveryPasswordTokenGet()

    expect(response).toEqual(mockData)
  })

  it('should return an empty recovery password token if nothing is stored', async () => {
    const response = await storageRecoveryPasswordTokenGet()

    expect(response).toEqual({ recoveryPasswordToken: '' })
  })

  it('should remove the recovery password token from AsyncStorage', async () => {
    await AsyncStorage.setItem(
      RECOVERY_PASSWORD_STORAGE,
      JSON.stringify(mockData)
    )

    await storageRecoveryPasswordTokenRemove()

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
      RECOVERY_PASSWORD_STORAGE
    )
  })
})
