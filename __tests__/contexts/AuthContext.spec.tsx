import {
  AuthContext,
  type AuthContextDataProps,
  AuthContextProvider,
} from '@/contexts/AuthContext'
import { authenticateService } from '@/services/authenticateService'
import { getUserProfileService } from '@/services/getUserProfileService'
import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from '@/storage/storageAuthToken'
import { act, render, waitFor } from '@testing-library/react-native'
import { Text } from 'react-native'
import { mockAuthenticationResponse } from '../../__mocks__/api/mockAuthenticationApiResponse'

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}))

jest.mock('@/services/authenticateService')
jest.mock('@/services/getUserProfileService')
jest.mock('@/storage/storageAuthToken')
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}))

const mockUser = {
  id: '1',
  name: 'John Doe',
  username: 'John123',
  email: 'john.doe@example.com',
}

const mockTokens = mockAuthenticationResponse

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render AuthContextProvider correctly', () => {
    const { getByTestId } = render(
      <AuthContextProvider>
        <AuthContext.Consumer>
          {value => (
            <>{value && <Text testID="provider-rendered">Rendered</Text>}</>
          )}
        </AuthContext.Consumer>
      </AuthContextProvider>
    )

    expect(getByTestId('provider-rendered')).toBeTruthy()
  })

  it('should authenticate and save tokens on successful login', async () => {
    ;(authenticateService as jest.Mock).mockResolvedValueOnce(mockTokens)

    let contextValue: AuthContextDataProps

    render(
      <AuthContextProvider>
        <AuthContext.Consumer>
          {value => {
            contextValue = value
            return null
          }}
        </AuthContext.Consumer>
      </AuthContextProvider>
    )

    await act(async () => {
      await contextValue.login('john.doe@example.com', 'password123')
    })

    await waitFor(() => {
      expect(authenticateService).toHaveBeenCalledWith({
        email: 'john.doe@example.com',
        password: 'password123',
      })
      expect(storageAuthTokenSave).toHaveBeenCalledWith(mockTokens)
    })
  })

  it('should throw error if authentication fails', async () => {
    const error = new Error('Invalid credentials')
    ;(authenticateService as jest.Mock).mockRejectedValueOnce(error)

    let contextValue: AuthContextDataProps

    render(
      <AuthContextProvider>
        <AuthContext.Consumer>
          {value => {
            contextValue = value
            return null
          }}
        </AuthContext.Consumer>
      </AuthContextProvider>
    )

    await waitFor(async () => {
      await expect(
        contextValue.login('invalid@example.com', 'wrongpass')
      ).rejects.toThrow('Invalid credentials')
    })
  })

  it('should load user profile if token exists during auth', async () => {
    ;(storageAuthTokenGet as jest.Mock).mockResolvedValueOnce({
      token: mockTokens.token,
    })
    ;(getUserProfileService as jest.Mock).mockResolvedValueOnce({
      user: mockUser,
    })

    let contextValue: AuthContextDataProps

    render(
      <AuthContextProvider>
        <AuthContext.Consumer>
          {value => {
            contextValue = value
            return null
          }}
        </AuthContext.Consumer>
      </AuthContextProvider>
    )

    await act(async () => {
      contextValue.auth()
    })

    await waitFor(() => {
      expect(getUserProfileService).toHaveBeenCalledWith({
        token: mockTokens.token,
      })
    })
  })

  it('should redirect to login if token does not exist during auth', async () => {
    ;(storageAuthTokenGet as jest.Mock).mockResolvedValueOnce({ token: '' })

    let contextValue: AuthContextDataProps

    render(
      <AuthContextProvider>
        <AuthContext.Consumer>
          {value => {
            contextValue = value
            return null
          }}
        </AuthContext.Consumer>
      </AuthContextProvider>
    )

    await act(async () => {
      await waitFor(() => {
        expect(contextValue.user).toBeNull()
      })
    })
  })
})
