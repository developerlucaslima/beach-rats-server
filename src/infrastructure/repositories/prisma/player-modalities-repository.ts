import { prisma } from "@/infrastructure/database/prisma"
import type { IPlayerModalitiesRepository } from "@repositories/interfaces/player-modalities-repository"
import type { PlayerModalityCreateParams } from "@/shared/app-types/player-modalities-types"

export class PrismaPlayerModalitiesRepository implements IPlayerModalitiesRepository {
  async add(data: PlayerModalityCreateParams) {
    const playerModality = await prisma.playerModality.create({
      data
    })
    return playerModality
  }

  async addAsMainModality(data: PlayerModalityCreateParams) {
    const playerModalityTx = await prisma.$transaction(async (tx) => {
      const createdPlayerModality = await tx.playerModality.create({
        data
      })

      await tx.player.update({
        where: { id: data.playerId },
        data: {
          mainModalityId: data.modalityId
        }
      })

      return createdPlayerModality
    })
    return playerModalityTx
  }

  async findByPlayerIdAndModalityId(params: { playerId: string; modalityId: string }) {
    const { playerId, modalityId } = params
    const playerModality = await prisma.playerModality.findUnique({
      where: {
        playerId_modalityId: {
          playerId,
          modalityId
        }
      }
    })
    return playerModality
  }

  async hasPlayerModality(params: { playerId: string; modalityId: string }) {
    const { playerId, modalityId } = params
    const count = await prisma.playerModality.count({
      where: {
        playerId: playerId,
        modalityId: modalityId
      }
    })
    return Boolean(count)
  }

  async countModalitiesByPlayerId(playerId: string) {
    const count = await prisma.playerModality.count({
      where: { playerId }
    })
    return count
  }
}
