import { mapAuthenticatedPlayerResponse } from '@dto/player-dto'
import { makeGetPlayerProfile } from '@factories/make-get-player-profile'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getPlayerProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const playerId = request.user.sub

  const getPlayerProfileUseCase = makeGetPlayerProfile()
  const { player } = await getPlayerProfileUseCase.execute({
    playerId,
  })

  return reply.status(201).send({
    message: 'Player profile retrieved successfully.',
    player: mapAuthenticatedPlayerResponse(player),
  })
}
