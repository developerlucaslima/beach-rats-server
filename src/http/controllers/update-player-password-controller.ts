import { makeUpdatePlayerPassword } from '@factories/make-update-player-password'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

// Validação do body
const updatePlayerPasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
})

export async function updatePlayerPasswordController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const playerId = request.user.sub

  const { currentPassword, newPassword } = updatePlayerPasswordSchema.parse(
    request.body,
  )

  const updatePlayerPasswordUseCase = makeUpdatePlayerPassword()

  const { success } = await updatePlayerPasswordUseCase.execute({
    playerId,
    currentPassword,
    newPassword,
  })

  return reply.status(200).send({
    message: 'Password updated successfully.',
    success,
  })
}
