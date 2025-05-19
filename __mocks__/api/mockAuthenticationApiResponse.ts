import { randomUUID } from 'node:crypto'

import type { AuthenticateServiceResponse } from '@/services/authenticateService'

export const mockAuthenticationResponse: AuthenticateServiceResponse = {
  token: randomUUID(),
  refreshToken: randomUUID(),
}
