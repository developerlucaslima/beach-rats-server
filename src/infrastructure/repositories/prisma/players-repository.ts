import { prisma } from '@/infrastructure/database/prisma'

import type { IPlayersRepository } from '@interfaces-repo/players-repository'
import type { PlayerCreateParams, PlayerUpdateParams } from '@app-types/players-types'

export class PrismaPlayersRepository implements IPlayersRepository {
  async create(data: PlayerCreateParams) {
    const player = await prisma.player.create({
      data,
    })
    return player
  }

  async updateProfile(params: { playerId: string; data: PlayerUpdateParams }) {
    const { playerId, data } = params
    const player = await prisma.player.update({
      where: { id: playerId },
      data,
    })
    return player
  }

  async updatePassword(params: { playerId: string; passwordHash: string }) {
    const { playerId, passwordHash } = params
    await prisma.player.update({
      where: { id: playerId },
      data: {
        passwordHash,
      }
    })
    return true
  }

  async attachGoogleAccount(params: { playerId: string; googleId: string; avatarUrl?: string }) {
    const { playerId, googleId, avatarUrl } = params
    const player = prisma.player.update({
      where: { id: playerId },
      data: {
        googleId,
        ...(avatarUrl && { avatarUrl }),
      },
    })
    return player
  }

  async setMainModality(params: { playerId: string; modalityId: string }) {
    const { playerId, modalityId } = params
    await prisma.player.update({
      where: { id: playerId },
      data: {
        mainModalityId: modalityId,
      }
    })
    return true
  }

  async findById(playerId: string) {
    const player = await prisma.player.findUnique({
      where: {
        id: playerId,
      },
    })
    return player
  }

  async findByEmail(email: string) {
    const player = await prisma.player.findUnique({
      where: {
        email,
      },
    })
    return player
  }

  async findByGoogleId(googleId: string) {
    const player = await prisma.player.findUnique({
      where: {
        googleId
      }
    })
    return player
  }
}