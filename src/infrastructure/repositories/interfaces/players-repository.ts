import type { Player, Prisma } from '@prisma/client'

export interface IPlayersRepository {
  create(data: Prisma.PlayerUncheckedCreateInput): Promise<Player>

  updateProfile(args: { playerId: string, data: Prisma.PlayerUpdateInput }): Promise<Player>
  updatePassword(args: { playerId: string, passwordHash: string }): Promise<boolean>
  attachGoogleAccount(args: { playerId: string, googleId: string, avatarUrl?: string }): Promise<Player>

  setMainModality(args: { playerId: string, modalityId: string }): Promise<boolean>

  findById(playerId: string): Promise<Player | null>
  findByEmail(email: string): Promise<Player | null>
  findByGoogleId(googleId: string): Promise<Player | null>
}