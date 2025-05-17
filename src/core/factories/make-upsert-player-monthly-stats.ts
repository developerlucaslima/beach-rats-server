import { PrismaPlayerModalitiesRepository } from '@repositories/prisma/player-modalities-repository'
import { PrismaPlayerModalityMonthsStatsRepository } from '@repositories/prisma/player-modality-months-stats-repository'
import { PrismaSkillsRepository } from '@repositories/prisma/skills-repository'
import { StatsCalculatorService } from '@services/stats-calculator-service'
import { UpsertPlayerMonthlyStatsUseCase } from '@use-cases/upsert-player-monthly-stats-use-case'

export function makeUpsertPlayerMonthlyStats() {
  const prismaPlayerModalitiesRepository =
    new PrismaPlayerModalitiesRepository()
  const prismaPlayerModalityMonthsStatsRepository =
    new PrismaPlayerModalityMonthsStatsRepository()
  const prismaSkillsRepository = new PrismaSkillsRepository()
  const statsCalculatorService = new StatsCalculatorService()

  const upsertPlayerMonthStatsUseCase = new UpsertPlayerMonthlyStatsUseCase(
    prismaPlayerModalitiesRepository,
    prismaPlayerModalityMonthsStatsRepository,
    prismaSkillsRepository,
    statsCalculatorService,
  )
  return upsertPlayerMonthStatsUseCase
}
