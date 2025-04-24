import { prisma } from "@/infrastructure/database/prisma"
import type { IPlayerModalitiesRepository } from "../interfaces/player-modalities"
import type { Prisma } from "@prisma/client"

export class PrismaPlayerModalitiesRepository implements IPlayerModalitiesRepository {
  async add(data: Prisma.PlayerModalityUncheckedCreateInput) {
    const modality = await prisma.playerModality.create({
      data,
    })
    return modality
  }

  async hasModalityForPlayer(args: { playerId: string, modalityId: string }) {
    const { playerId, modalityId } = args
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
