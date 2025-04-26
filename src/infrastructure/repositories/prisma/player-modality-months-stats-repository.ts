import { prisma } from "@/infrastructure/database/prisma"
import type { IPlayerModalityMonthsStatsRepository } from "../interfaces/player-modality-months-stats-repository"
import type { AddCompleteModalityFlowData } from "@/shared/app-types/player-modality-months-stats-types"


export class PrismaPlayerModalityMonthsStatsRepository implements IPlayerModalityMonthsStatsRepository {
  async addCompletePlayerModalityFlow(data: AddCompleteModalityFlowData) {
    const { playerId, modalityId, skillsIdsWithCategory, playerModalityStats } = data
    const isTransactionComplete = await prisma.$transaction(async (tx) => {
      const playerModality = await tx.playerModality.create({
        data: { playerId, modalityId }
      })

      const playerModalityMonthStats = await tx.playerModalityMonthStats.create({
        data: {
          month: new Date(),
          playerModalityId: playerModality.id,
          fundamentalsScore: playerModalityStats.fundamentalsScore,
          resourcesScore: playerModalityStats.resourcesScore,
          attackScore: playerModalityStats.attackScore,
          defenseScore: playerModalityStats.defenseScore,
          overallScore: playerModalityStats.overallScore,
        }
      })

      const skillsData = skillsIdsWithCategory.map(skill => ({
        playerModalityMonthId: playerModalityMonthStats.id,
        skillId: skill.skillId,
        category: skill.category
      }))

      await tx.playerSkillMonthStats.createMany({ data: skillsData })

      return true
    })

    return isTransactionComplete
  }
}
