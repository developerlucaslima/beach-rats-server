import { mapAuthenticatedPlayerResponse } from '@dto/player-dto'
import { BusinessRuleException } from '@errors/business-rules-exception'
import { makeAuthPlayerWithGoogle } from '@factories/make-auth-player-with-google'
import {
  ACCESS_TOKEN_EXPIRATION_SECONDS,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_EXPIRATION_SECONDS,
} from '@jwt/jwt-config'
import { setTokenCookie } from '@jwt/set-refresh-token-cookie'
import { GoogleAuthService } from '@services/google-auth-service'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const authPlayerWithGoogleSchema = z.object({
  idToken: z.string().min(10),
})

export async function authPlayerWithGoogleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { idToken } = authPlayerWithGoogleSchema.parse(request.body)

  const googleAuthService = new GoogleAuthService()
  const { sub, email, emailVerified, name, avatarUrl } =
    await googleAuthService.verifyIdToken(idToken)

  /* Optional: reject unverified emails */
  if (!emailVerified) {
    throw new BusinessRuleException('Google email not verified.')
  }

  const authPlayerWithGoogleUseCase = makeAuthPlayerWithGoogle()
  const { player } = await authPlayerWithGoogleUseCase.execute({
    name,
    email,
    googleId: sub,
    avatarUrl,
  })

  const jwtPayload = {
    role: player.role,
    subscriptionPlan: player.subscriptionPlan,
  }

  const token = await reply.jwtSign(jwtPayload, {
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

  setTokenCookie({
    reply,
    tokenName: REFRESH_TOKEN_COOKIE_NAME,
    token: refreshToken,
    maxAge: REFRESH_TOKEN_EXPIRATION_SECONDS,
  })

  return reply.status(201).send({
    message: 'Auth with google successfully.',
    token,
    player: mapAuthenticatedPlayerResponse(player),
  })
}
