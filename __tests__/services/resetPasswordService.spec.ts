import { api } from '@/lib/axios'
import { ResetPasswordService } from '@/services/resetPasswordService'

import { AxiosError } from 'axios'

jest.mock('@/lib/axios')

describe('ResetPasswordService', () => {
  const mockData = {
    token: 'mocked-token',
    refreshToken: 'mocked-refresh-token',
  }

  const requestData = {
    password: 'newPassword123',
    passwordConfirmation: 'newPassword123',
    resetPasswordToken: 'mocked-reset-token',
  }

  it('should reset password successfully', async () => {
    ;(api.post as jest.Mock).mockResolvedValueOnce({ data: mockData })

    const result = await ResetPasswordService(requestData)

    expect(api.post).toHaveBeenCalledWith(
      '/recovery-password/reset-password',
      {
        password: requestData.password,
        passwordConfirmation: requestData.passwordConfirmation,
      },
      {
        headers: { Authorization: `Bearer ${requestData.resetPasswordToken}` },
      }
    )
    expect(result).toEqual(mockData)
  })

  it('should throw an error if reset password fails', async () => {
    const error = new AxiosError('Request failed')
    ;(api.post as jest.Mock).mockRejectedValueOnce(error)

    await expect(ResetPasswordService(requestData)).rejects.toThrow(
      'Request failed'
    )
  })
})
