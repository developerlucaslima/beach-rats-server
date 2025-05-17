import type {
  Player,
  PlayerCreateParams,
  PlayerUpdateParams,
} from '@app-types/players-types'

export interface IPlayersRepository {
  create(data: PlayerCreateParams): Promise<Player>
  updateProfile(params: {
    playerId: string
    data: PlayerUpdateParams
  }): Promise<Player>
  updatePassword(params: {
    playerId: string
    passwordHash: string
  }): Promise<boolean>
  attachGoogleAccount(params: {
    playerId: string
    googleId: string
    avatarUrl?: string
  }): Promise<Player>
  setMainModality(params: {
    playerId: string
    modalityId: string
  }): Promise<boolean>

  findById(playerId: string): Promise<Player | null>
  findByEmail(email: string): Promise<Player | null>
  findByGoogleId(googleId: string): Promise<Player | null>
}
