import { prisma } from "@/infrastructure/database/prisma"
import type { IPlayerModalityMonthsStatsRepository } from "../interfaces/player-modality-months-stats-repository"
import type { AddCompleteModalityFlowData, PlayerModalityMonthStats } from "@/shared/app-types/player-modality-months-stats-types"


export class PrismaPlayerModalityMonthsStatsRepository implements IPlayerModalityMonthsStatsRepository {
  async findByPlayerModalityIdAndMonth(params: { playerModalityId: string, month: Date }) {
    const { playerModalityId, month } = params
    const playerModalityMonthStats = await prisma.playerModalityMonthStats.findUnique({
      where: {
        playerModalityId_month: {
          playerModalityId,
          month
        }
      }
    })
    return playerModalityMonthStats
  }

  async upsertMonthlyStats(data: AddCompleteModalityFlowData) {
    const { playerModalityId, month, skillsIdsWithCategory, playerModalityStats } = data
    const { fundamentalsScore, resourcesScore, attackScore, defenseScore, overallScore } = playerModalityStats

    const isTransactionComplete = await prisma.$transaction(async (tx) => {
      const playerModalityMonthStats = await tx.playerModalityMonthStats.upsert({
        where: {
          playerModalityId_month: {
            playerModalityId,
            month,
          },
        },
        update: {
          fundamentalsScore,
          resourcesScore,
          attackScore,
          defenseScore,
          overallScore,
        },
        create: {
          playerModalityId,
          month,
          fundamentalsScore,
          resourcesScore,
          attackScore,
          defenseScore,
          overallScore,
        },
      })

      await Promise.all(
        skillsIdsWithCategory.map(({ skillId, category }) =>
          tx.playerSkillMonthStats.upsert({
            where: {
              playerModalityMonthId_skillId: {
                playerModalityMonthId: playerModalityMonthStats.id,
                skillId,
              },
            },
            update: { category },
            create: {
              playerModalityMonthId: playerModalityMonthStats.id,
              skillId,
              category,
            },
          })
        )
      )
      return true
    })

    return isTransactionComplete
  }
}
