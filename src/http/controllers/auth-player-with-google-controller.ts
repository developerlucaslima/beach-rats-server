import { mapAuthenticatedPlayerResponse } from '@dto/player-dto'
import { BusinessRuleException } from '@errors/business-rules-exception'
import { makeAuthPlayerWithGoogle } from '@factories/make-auth-player-with-google'
import {
  ACCESS_TOKEN_EXPIRATION_SECONDS,
  REFRESH_TOKEN_EXPIRATION_SECONDS,
} from '@jwt/jwt-config'
import { setAuthCookies } from '@jwt/set-auth-cookies'
import { GoogleOAuthService } from '@services/google-oauth-service'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const authPlayerWithGoogleSchema = z.object({
  authorizationCode: z.string().min(10),
  redirectUri: z.string().url(),
})

export async function authPlayerWithGoogleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { authorizationCode, redirectUri } = authPlayerWithGoogleSchema.parse(request.body)

  const googleService = new GoogleOAuthService(redirectUri)
  const { sub, email, isEmailVerified, name, avatarUrl } = await googleService.exchangeCodeForUser(authorizationCode)

  if (!isEmailVerified) {
    throw new BusinessRuleException('Google email not verified.')
  }

  const authPlayerWithGoogleUseCase = makeAuthPlayerWithGoogle()
  const { player } = await authPlayerWithGoogleUseCase.execute({
    name,
    email,
    googleId: sub,
    avatarUrl,
    isEmailVerified,
  })

  const jwtPayload = {
    role: player.role,
    subscriptionPlan: player.subscriptionPlan,
  }

  const accessToken = await reply.jwtSign(jwtPayload, {
    sign: {
      sub: player.id,
      expiresIn: `${ACCESS_TOKEN_EXPIRATION_SECONDS}s`,
    },
  })

  const refreshToken = await reply.jwtSign(jwtPayload, {
    sign: {
      sub: player.id,
      expiresIn: `${REFRESH_TOKEN_EXPIRATION_SECONDS}s`,
    },
  })

  setAuthCookies(reply, accessToken, refreshToken)

  return reply.status(200).send(mapAuthenticatedPlayerResponse(player))
}
