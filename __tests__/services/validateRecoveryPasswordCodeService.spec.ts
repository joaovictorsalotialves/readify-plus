import { api } from '@/lib/axios'
import { ValidateRecoverPasswordCodeService } from '@/services/validateRecoveryPasswordCodeService'
import {
  AxiosError,
  AxiosHeaders,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

jest.mock('@/lib/axios')

describe('ValidateRecoverPasswordCodeService', () => {
  const mockPasswordRecoveryCode = '123456'
  const mockRecoveryPasswordToken = 'mocked-recovery-token'
  const mockResetPasswordToken = 'mocked-reset-token'

  it('should return the reset password token when the code is valid', async () => {
    const mockResponse: AxiosResponse = {
      data: {
        resetPasswordToken: mockResetPasswordToken,
      },
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config: {} as InternalAxiosRequestConfig,
    }
    ;(api.post as jest.Mock).mockResolvedValueOnce(mockResponse)

    const response = await ValidateRecoverPasswordCodeService({
      passwordRecoveryCode: mockPasswordRecoveryCode,
      recoveryPasswordToken: mockRecoveryPasswordToken,
    })

    expect(api.post).toHaveBeenCalledWith(
      '/recovery-password/validate-code',
      {
        passwordRecoveryCode: mockPasswordRecoveryCode,
      },
      {
        headers: { Authorization: `Bearer ${mockRecoveryPasswordToken}` },
      }
    )
    expect(response).toEqual({
      resetPasswordToken: mockResetPasswordToken,
    })
  })

  it('should throw an error if the API call fails', async () => {
    const mockError = new AxiosError('Invalid Code')
    ;(api.post as jest.Mock).mockRejectedValueOnce(mockError)

    await expect(
      ValidateRecoverPasswordCodeService({
        passwordRecoveryCode: mockPasswordRecoveryCode,
        recoveryPasswordToken: mockRecoveryPasswordToken,
      })
    ).rejects.toThrow('Invalid Code')

    expect(api.post).toHaveBeenCalledWith(
      '/recovery-password/validate-code',
      {
        passwordRecoveryCode: mockPasswordRecoveryCode,
      },
      {
        headers: { Authorization: `Bearer ${mockRecoveryPasswordToken}` },
      }
    )
  })
})
