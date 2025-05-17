import { makeSetPlayerPassword } from '@factories/make-set-player-password'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

// Schema para validar o body da requisição
const setPlayerPasswordSchema = z.object({
  newPassword: z.string().min(6),
})

export async function setPlayerPasswordController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const playerId = request.user.sub

  const { newPassword } = setPlayerPasswordSchema.parse(request.body)

  const setPlayerPasswordUseCase = makeSetPlayerPassword()

  const { success } = await setPlayerPasswordUseCase.execute({
    playerId,
    newPassword,
  })

  return reply.status(200).send({
    message: 'Password set successfully.',
    success,
  })
}
