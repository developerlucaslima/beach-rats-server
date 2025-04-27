import { makeSignInPlayer } from '@factories/make-sign-in-player'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { mapAuthenticatedPlayerResponse } from '@dto/player-dto'
import { setTokenCookie } from '@jwt/set-refresh-token-cookie'
import { ACCESS_TOKEN_EXPIRATION_SECONDS, REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_EXPIRATION_SECONDS } from '@jwt/jwt-config'

const signInPlayerSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
})

export async function signInPlayerController(request: FastifyRequest, reply: FastifyReply) {
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

	const token = await reply.jwtSign(
		jwtPayload,
		{
			sign: {
				sub: player.id,
				expiresIn: `${ACCESS_TOKEN_EXPIRATION_SECONDS}s`,
			},
		},
	)

	const refreshToken = await reply.jwtSign(
		jwtPayload,
		{
			sign: {
				sub: player.id,
				expiresIn: `${REFRESH_TOKEN_EXPIRATION_SECONDS}s`,
			},
		},
	)

	setTokenCookie({
		reply,
		tokenName: REFRESH_TOKEN_COOKIE_NAME,
		token: refreshToken,
		maxAge: REFRESH_TOKEN_EXPIRATION_SECONDS
	})

	return reply.status(200).send({
		message: 'Sign in successfully.',
		token,
		player: mapAuthenticatedPlayerResponse(player),
	})
}