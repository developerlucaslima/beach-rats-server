import { makeGetPlayerMonthlyStats } from '@factories/make-get-player-monthly-stats'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { formattedMonth } from '@/shared/utils/formatted-month'

const getPlayerMonthlyStatsSchema = z.object({
  playerModalityId: z.string(),
  month: z.date(),
})

export async function getPlayerMonthlyStatsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { playerModalityId, month } = getPlayerMonthlyStatsSchema.parse(
    request.body,
  )

  const getPlayerMonthlyStatsUseCase = makeGetPlayerMonthlyStats()
  const { playerModalityMonthStats } =
    await getPlayerMonthlyStatsUseCase.execute({
      playerModalityId,
      month,
    })

  return reply.status(201).send({
    message: `The stats of ${formattedMonth(month)} were added successfully.`,
    playerModalityMonthStats,
  })
}
