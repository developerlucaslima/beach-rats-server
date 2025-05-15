import { mapAuthenticatedPlayerResponse } from '@dto/player-dto'
import { makeSignInPlayer } from '@factories/make-sign-in-player'
import {
  ACCESS_TOKEN_EXPIRATION_SECONDS,
  REFRESH_TOKEN_EXPIRATION_SECONDS,
} from '@jwt/jwt-config'
import { setAuthCookies } from '@jwt/set-auth-cookies'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const signInPlayerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function signInPlayerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = signInPlayerSchema.parse(request.body)
  const signInPlayerUseCase = makeSignInPlayer()
  const { player } = await signInPlayerUseCase.execute({
    email,
    password,
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

  return reply.status(200).send({
    message: 'Player signed in successfully.',
    data: mapAuthenticatedPlayerResponse(player),
  })
}
