import { api } from '@/lib/axios'

type ResetPasswordServiceRequest = {
  password: string
  passwordConfirmation: string
  resetPasswordToken: string
}

type ResetPasswordServiceResponse = {
  token: string
  refreshToken: string
}

export async function ResetPasswordService({
  password,
  passwordConfirmation,
  resetPasswordToken,
}: ResetPasswordServiceRequest): Promise<ResetPasswordServiceResponse> {
  const { data } = await api.post(
    '/recovery-password/reset-password',
    {
      password,
      passwordConfirmation,
    },
    {
      headers: { Authorization: `Bearer ${resetPasswordToken}` },
    }
  )

  return {
    token: data.token,
    refreshToken: data.refreshToken,
  }
}
