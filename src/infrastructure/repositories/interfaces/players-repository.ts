import type { Player, Prisma } from '@prisma/client'

export interface IPlayersRepository {
  create(data: Prisma.PlayerUncheckedCreateInput): Promise<Player>
  findById(id: string): Promise<Player | null>
  findByEmail(email: string): Promise<Player | null>
}