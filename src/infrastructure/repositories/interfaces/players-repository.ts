import type { Player, Prisma } from '@prisma/client'

export interface IPlayersRepository {
  create(data: Prisma.PlayerUncheckedCreateInput): Promise<Player>
  findById(id: string): Promise<Player | null>
  findByEmail(email: string): Promise<Player | null>
  findByGoogleId(googleId: string): Promise<Player | null>
  attachGoogleAccount(args: { playerId: string, googleId: string, avatarUrl?: string }): Promise<Player>
}