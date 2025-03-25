import { prisma } from '@/config/prisma'
import { createOnePlayerResolver, type CreateOnePlayerProps } from './create-one-player'

export const resolvers = {
  Query: {
    findAllPlayers: () => prisma.player.findMany(),
  },
  Mutation: {
    createOnePlayer: async (
      _: any,
      args: CreateOnePlayerProps,
    ) => {
      return await createOnePlayerResolver(args)
    },
  },
}
