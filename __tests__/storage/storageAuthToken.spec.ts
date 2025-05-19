import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@/storage/storageAuthToken'
import { AUTH_STORAGE } from '@/storage/storageConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}))

const mockData = {
  token: 'mocked-token',
  refreshToken: 'mocked-refresh-token',
}

describe('storageAuthToken', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it('should save the token and refreshToken to AsyncStorage', async () => {
    await storageAuthTokenSave(mockData)

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      AUTH_STORAGE,
      JSON.stringify(mockData)
    )
  })

  it('should get the token and refreshToken from AsyncStorage', async () => {
    ;(AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(mockData)
    )

    const response = await storageAuthTokenGet()

    expect(response).toEqual(mockData)
  })

  it('should return empty token and refreshToken if nothing is stored', async () => {
    const response = await storageAuthTokenGet()

    expect(response).toEqual({ token: '', refreshToken: '' })
  })

  it('should remove the token and refreshToken from AsyncStorage', async () => {
    await AsyncStorage.setItem(AUTH_STORAGE, JSON.stringify(mockData))

    await storageAuthTokenRemove()

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(AUTH_STORAGE)
  })
})
