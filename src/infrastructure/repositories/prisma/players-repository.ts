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

  async updateProfile(args: { playerId: string; data: Prisma.PlayerUpdateInput }) {
    const { playerId, data } = args
    const player = await prisma.player.update({
      where: { id: playerId },
      data,
    })
    return player
  }

  async updatePassword(args: { playerId: string; passwordHash: string }) {
    const { playerId, passwordHash } = args
    const player = await prisma.player.update({
      where: { id: playerId },
      data: {
        passwordHash,
      }
    })
    return Boolean(player)
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