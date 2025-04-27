import { UnauthorizedException } from '@errors/unauthorized-exception'
import { makeAddPlayerModality } from '@factories/make-add-player-modality'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const addPlayerModalitySchema = z.object({
  modalityId: z.string(),
})

export async function addPlayerModalityController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { modalityId } = addPlayerModalitySchema.parse(request.body)

  const playerId = request.user.sub
  if (!playerId) {
    throw new UnauthorizedException('Missing player ID in JWT payload.')
  }

  const addPlayerModalityUseCase = makeAddPlayerModality()
  const { playerModality } = await addPlayerModalityUseCase.execute({
    playerId,
    modalityId,
  })

  return reply.status(201).send({
    message: 'Modality added successfully.',
    player: playerModality,
  })
}
