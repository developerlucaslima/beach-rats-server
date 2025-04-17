import type { Prisma } from '@prisma/client'

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
}