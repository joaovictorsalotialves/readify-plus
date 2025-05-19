import { api } from '@/lib/axios'
import { SendEmailToRecoverPasswordService } from '@/services/sendEmailToRecoverPasswordService'
import { AxiosError } from 'axios'

jest.mock('@/lib/axios')

const mockedApi = api as jest.Mocked<typeof api>

describe('SendEmailToRecoverPasswordService', () => {
  const mockResponse = {
    recoveryPasswordToken: 'mocked-recovery-token',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should send email and return recovery password token', async () => {
    mockedApi.post.mockResolvedValueOnce({ data: mockResponse })

    const response = await SendEmailToRecoverPasswordService({
      email: 'test@example.com',
    })

    expect(mockedApi.post).toHaveBeenCalledWith(
      '/recovery-password/send-email',
      {
        email: 'test@example.com',
      }
    )
    expect(response).toEqual(mockResponse)
  })

  it('should throw an error if the request fails', async () => {
    const mockError = new AxiosError('Request failed')
    mockedApi.post.mockRejectedValueOnce(mockError)

    await expect(
      SendEmailToRecoverPasswordService({
        email: 'test@example.com',
      })
    ).rejects.toThrow('Request failed')
  })
})
