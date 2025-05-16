import { api } from '@/lib/axios'

type SendEmailToRecoverPasswordServiceRequest = {
  email: string
}

type SendEmailToRecoverPasswordServiceResponse = {
  recoveryPasswordToken: string
}

export async function SendEmailToRecoverPasswordService({
  email,
}: SendEmailToRecoverPasswordServiceRequest): Promise<SendEmailToRecoverPasswordServiceResponse> {
  const { data } = await api.post('/recovery-password/send-email', {
    email,
  })

  return {
    recoveryPasswordToken: data.recoveryPasswordToken,
  }
}
