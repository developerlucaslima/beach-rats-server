import { prisma } from "@/config/prisma";

export const resolvers = {
  Query: {
    allPlayers: () => prisma.player.findMany(),
  },
};