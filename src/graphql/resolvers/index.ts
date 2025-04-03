import { prisma } from '@/config/prisma'
import { createOnePlayerResolver } from './create-one-player'

export const resolvers = {
  Query: {
    findAllPlayers: () => prisma.player.findMany(),
  },
  Mutation: {
    createOnePlayer: createOnePlayerResolver,
  },
}
