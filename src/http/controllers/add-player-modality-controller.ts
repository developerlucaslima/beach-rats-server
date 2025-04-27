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
  const playerId = request.user.sub
  const { modalityId } = addPlayerModalitySchema.parse(request.body)

  const addPlayerModalityUseCase = makeAddPlayerModality()
  const { playerModality } = await addPlayerModalityUseCase.execute({
    playerId,
    modalityId,
  })

  return reply.status(201).send({
    message: 'Modality added successfully.',
    data: playerModality,
  })
}
