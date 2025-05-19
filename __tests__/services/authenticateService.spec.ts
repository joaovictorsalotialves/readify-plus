import { api } from '@/lib/axios'
import {
  type AuthenticateServiceResponse,
  authenticateService,
} from '@/services/authenticateService'
import { AxiosError } from 'axios'

jest.mock('@/lib/axios')

const mockResponse: AuthenticateServiceResponse = {
  token: 'mocked-token',
  refreshToken: 'mocked-refresh-token',
}

describe('authenticateService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should authenticate successfully and return tokens', async () => {
    ;(api.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse })

    const response = await authenticateService({
      email: 'test@example.com',
      password: 'password123',
    })

    expect(api.post).toHaveBeenCalledWith('/sessions', {
      email: 'test@example.com',
      password: 'password123',
    })
    expect(response).toEqual(mockResponse)
  })

  it('should throw an error if authentication fails', async () => {
    const mockError = new AxiosError(
      'Unauthorized',
      '401',
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      {} as any,
      {
        data: {
          message: 'Invalid Credentials.',
        },
      }
    )
    ;(api.post as jest.Mock).mockRejectedValueOnce(mockError)

    await expect(
      authenticateService({
        email: 'invalid@example.com',
        password: 'wrongpassword',
      })
    ).rejects.toThrow('Unauthorized')
  })

  it('should throw an error if there is a network issue', async () => {
    const mockNetworkError = new AxiosError('Network Error')
    ;(api.post as jest.Mock).mockRejectedValueOnce(mockNetworkError)

    await expect(
      authenticateService({
        email: 'test@example.com',
        password: 'password123',
      })
    ).rejects.toThrow('Network Error')
  })
})
