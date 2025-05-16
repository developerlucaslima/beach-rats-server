import { BusinessRuleException } from '@errors/business-rules-exception'
import { OAuth2Client } from 'google-auth-library'

import { env } from '@/env'

interface GoogleUserData {
  sub: string
  email: string
  isEmailVerified: boolean
  name?: string
  avatarUrl?: string
}

export class GoogleIdTokenService {
  private client: OAuth2Client

  constructor() {
    this.client = new OAuth2Client(env.AUTH_GOOGLE_ID)
  }

  async verifyIdToken(idToken: string): Promise<GoogleUserData> {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: env.AUTH_GOOGLE_ID,
    })

    const payload = ticket.getPayload()
    if (!payload || !payload.email) {
      throw new BusinessRuleException(
        'Google token is invalid or missing fields.',
      )
    }

    return {
      sub: payload.sub!,
      email: payload.email,
      isEmailVerified: payload.email_verified ?? false,
      name: payload.name,
      avatarUrl: payload.picture,
    }
  }
}
