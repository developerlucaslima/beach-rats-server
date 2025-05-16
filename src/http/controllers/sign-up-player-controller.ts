import { mapAuthenticatedPlayerResponse } from '@dto/player-dto'
import { makeSignUpPlayer } from '@factories/make-sign-up-player'
import {
  ACCESS_TOKEN_EXPIRATION_SECONDS,
  REFRESH_TOKEN_EXPIRATION_SECONDS,
} from '@jwt/jwt-config'
import { setAuthCookies } from '@jwt/set-auth-cookies'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const signUpPlayerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function signUpPlayerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, email, password } = signUpPlayerSchema.parse(request.body)

  const signUpPlayerUseCase = makeSignUpPlayer()
  const { player } = await signUpPlayerUseCase.execute({
    name,
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

  return reply.status(201).send(mapAuthenticatedPlayerResponse(player))
}
