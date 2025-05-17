import { makeUpsertPlayerMonthlyStats } from '@factories/make-upsert-player-monthly-stats'
import { Category } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const upsertPlayerMonthlyStatsSchema = z.object({
  modalityId: z.string(),
  month: z.coerce.date(),
  skillsIdsWithCategory: z
    .array(
      z.object({
        skillId: z.string(),
        category: z.nativeEnum(Category),
      }),
    )
    .min(1),
})

export async function upsertPlayerMonthlyStatsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const playerId = request.user.sub

  const { modalityId, month, skillsIdsWithCategory } =
    upsertPlayerMonthlyStatsSchema.parse(request.body)

  const upsertPlayerMonthlyStatsUseCase = makeUpsertPlayerMonthlyStats()

  const { success } = await upsertPlayerMonthlyStatsUseCase.execute({
    playerId,
    modalityId,
    month,
    skillsIdsWithCategory: skillsIdsWithCategory as {
      skillId: string
      category: Category
    }[],
  })

  return reply.status(200).send({
    message: 'Monthly stats upserted successfully.',
    success,
  })
}
