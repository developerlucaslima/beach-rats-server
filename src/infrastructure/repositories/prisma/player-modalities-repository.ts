import { prisma } from "@/infrastructure/database/prisma"
import type { IPlayerModalitiesRepository } from "../interfaces/player-modalities-repository"
import type { AddCompleteModalityFlowData } from "../types/player-modalities-types"

export class PrismaPlayerModalitiesRepository implements IPlayerModalitiesRepository {
  async addCompletePlayerModalityFlow(data: AddCompleteModalityFlowData) {
    const { playerId, modalityId, skillsIdsWithCategory, playerModalityStats } = data
    const createdRecords = await prisma.$transaction(async (tx) => {
      const playerModality = await tx.playerModality.create({
        data: { playerId, modalityId }
      })

      const playerModalityMonth = await tx.playerModalityMonth.create({
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
        playerModalityMonthId: playerModalityMonth.id,
        skillId: skill.skillId,
        category: skill.category
      }))

      await tx.playerSkillMonth.createMany({ data: skillsData })

      return {
        playerModalityId: playerModality.id,
        modalityMonthId: playerModalityMonth.id
      }
    })

    return createdRecords
  }

  async hasModalityForPlayer({ playerId, modalityId }: { playerId: string, modalityId: string }) {
    const count = await prisma.playerModality.count({
      where: {
        playerId,
        modalityId,
      },
    })
    return Boolean(count)
  }

  async countModalitiesForPlayer(playerId: string) {
    const count = await prisma.playerModality.count({
      where: { playerId }
    })
    return count
  }
}
