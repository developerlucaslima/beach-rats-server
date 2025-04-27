import {
  ACCESS_TOKEN_EXPIRATION_SECONDS,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_EXPIRATION_SECONDS,
} from '@jwt/jwt-config'
import { setTokenCookie } from '@jwt/set-refresh-token-cookie'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function refreshTokenController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify({ onlyCookie: true })

  const { sub, role, subscriptionPlan } = request.user

  const newAccessToken = await reply.jwtSign(
    {
      role,
      subscriptionPlan,
    },
    {
      sign: {
        sub,
        expiresIn: `${ACCESS_TOKEN_EXPIRATION_SECONDS}s`,
      },
    },
  )

  const newRefreshToken = await reply.jwtSign(
    {
      role,
      subscriptionPlan,
    },
    {
      sign: {
        sub,
        expiresIn: `${REFRESH_TOKEN_EXPIRATION_SECONDS}s`,
      },
    },
  )

  setTokenCookie({
    reply,
    tokenName: REFRESH_TOKEN_COOKIE_NAME,
    token: newRefreshToken,
    maxAge: REFRESH_TOKEN_EXPIRATION_SECONDS,
  })

  return reply.status(200).send({
    message: 'Token refreshed.',
    token: newAccessToken,
  })
}
