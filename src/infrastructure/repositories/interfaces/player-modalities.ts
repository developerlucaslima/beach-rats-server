import type { PlayerModality, Prisma } from "@prisma/client";

export interface IPlayerModalitiesRepository {
  add(data: Prisma.PlayerModalityUncheckedCreateInput): Promise<PlayerModality>
  hasModalityForPlayer(args: { playerId: string; modalityId: string }): Promise<boolean>
  countModalitiesForPlayer(playerId: string): Promise<number | null>
}
