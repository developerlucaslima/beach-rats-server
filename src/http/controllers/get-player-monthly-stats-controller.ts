import { makeGetPlayerMonthlyStats } from '@factories/make-get-player-monthly-stats'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const getPlayerMonthlyStatsSchema = z.object({
  playerModalityId: z.string(),
  month: z.coerce.date(),
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

  return reply.status(200).send(playerModalityMonthStats)
}
