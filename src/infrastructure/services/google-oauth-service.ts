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

export class GoogleOAuthService {
  private client: OAuth2Client

  constructor(redirectUri: string) {
    this.client = new OAuth2Client({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      redirectUri,
    })
  }

  async exchangeCodeForUser(code: string): Promise<GoogleUserData> {
    const { tokens } = await this.client.getToken(code)

    if (!tokens.id_token) {
      throw new BusinessRuleException('Google did not return a valid ID token.')
    }

    const ticket = await this.client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID!,
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
