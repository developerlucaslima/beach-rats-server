import {
  ACCESS_TOKEN_EXPIRATION_SECONDS,
  REFRESH_TOKEN_EXPIRATION_SECONDS,
} from '@jwt/jwt-config'
import { setAuthCookies } from '@jwt/set-auth-cookies'
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

  setAuthCookies(reply, newAccessToken, newRefreshToken)

  return reply.status(200).send({
    message: 'Token refreshed successfully.',
  })
}
