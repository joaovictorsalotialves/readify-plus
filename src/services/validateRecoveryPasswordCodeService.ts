import { api } from '@/lib/axios'

type ValidateRecoverPasswordCodeServiceRequest = {
  passwordRecoveryCode: string
  recoveryPasswordToken: string
}

type ValidateRecoverPasswordCodeServiceResponse = {
  resetPasswordToken: string
}

export async function ValidateRecoverPasswordCodeService({
  passwordRecoveryCode,
  recoveryPasswordToken,
}: ValidateRecoverPasswordCodeServiceRequest): Promise<ValidateRecoverPasswordCodeServiceResponse> {
  const { data } = await api.post(
    '/recovery-password/validate-code',
    {
      passwordRecoveryCode,
    },
    {
      headers: { Authorization: `Bearer ${recoveryPasswordToken}` },
    }
  )

  return {
    resetPasswordToken: data.resetPasswordToken,
  }
}
