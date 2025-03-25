import type { Player, Prisma } from '@prisma/client'

export interface PlayersRepository {
  createOnePlayer(data: Prisma.PlayerUncheckedCreateInput): Promise<Player>
  findManyPlayers(): Promise<Player[] | null>
  findOnePlayerById(id: string): Promise<Player | null>
  findOnePlayerByEmail(email: string): Promise<Player | null>
}
