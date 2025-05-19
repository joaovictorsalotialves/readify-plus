import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  storageResetPasswordTokenGet,
  storageResetPasswordTokenRemove,
  storageResetPasswordTokenSave,
} from '@/storage/storageResetPasswordToken'

import { RESET_PASSWORD_STORAGE } from '@/storage/storageConfig'

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}))

const mockData = {
  resetPasswordToken: 'mocked-reset-token',
}

describe('storageResetPasswordToken', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it('should save the reset password token to AsyncStorage', async () => {
    await storageResetPasswordTokenSave(mockData)

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      RESET_PASSWORD_STORAGE,
      JSON.stringify(mockData)
    )
  })

  it('should get the reset password token from AsyncStorage', async () => {
    ;(AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(mockData)
    )

    const response = await storageResetPasswordTokenGet()

    expect(response).toEqual(mockData)
  })

  it('should return an empty reset password token if nothing is stored', async () => {
    const response = await storageResetPasswordTokenGet()

    expect(response).toEqual({ resetPasswordToken: '' })
  })

  it('should remove the reset password token from AsyncStorage', async () => {
    await AsyncStorage.setItem(RESET_PASSWORD_STORAGE, JSON.stringify(mockData))

    await storageResetPasswordTokenRemove()

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(RESET_PASSWORD_STORAGE)
  })
})
