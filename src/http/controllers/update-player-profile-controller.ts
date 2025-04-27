import { mapAuthenticatedPlayerResponse } from '@dto/player-dto'
import { makeUpdatePlayerProfile } from '@factories/make-update-player-profile'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

// Schema para validar os campos opcionais do perfil
const updatePlayerProfileSchema = z.object({
  name: z.string().min(3).optional(),
  avatarUrl: z.string().url().optional(),
  bio: z.string().max(255).optional(),
  age: z.number().int().positive().optional(),
  countryCode: z.string().length(2).optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  physicalConditionName: z.string().optional(),
  mentalConditionName: z.string().optional(),
})

export async function updatePlayerProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const playerId = request.user.sub

  const data = updatePlayerProfileSchema.parse(request.body)

  const updatePlayerProfileUseCase = makeUpdatePlayerProfile()

  const { player } = await updatePlayerProfileUseCase.execute({
    playerId,
    ...data,
  })

  return reply.status(200).send({
    message: 'Player profile updated successfully.',
    data: mapAuthenticatedPlayerResponse(player),
  })
}
