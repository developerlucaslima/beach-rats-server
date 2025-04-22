import type { Player, Prisma } from '@prisma/client'

import { prisma } from '@/infrastructure/database/prisma'

import type { IPlayersRepository } from '../interfaces/players-repository'

export class PrismaPlayersRepository implements IPlayersRepository {
  async create(data: Prisma.PlayerUncheckedCreateInput) {
    const player = await prisma.player.create({
      data,
    })
    return player
  }

  async findById(id: string) {
    const player = await prisma.player.findUnique({
      where: {
        id,
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

  async attachGoogleAccount(args: { playerId: string; googleId: string; avatarUrl?: string }) {
    const { playerId, googleId, avatarUrl } = args
    const player = prisma.player.update({
      where: { id: playerId },
      data: {
        googleId,
        ...(avatarUrl && { avatarUrl }),
      },
    })
    return player
  }
}