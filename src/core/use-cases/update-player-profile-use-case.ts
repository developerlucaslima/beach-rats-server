import type { Player } from '@app-types/players-types'
import { ResourceNotFoundException } from '@errors/resource-not-found-exception'
import type { IPlayersRepository } from '@repositories/interfaces/players-repository'

interface UpdatePlayerProfileUseCaseRequest {
  playerId: string
  name?: string
  avatarUrl?: string
  bio?: string
  age?: number
  countryCode?: string
  latitude?: number
  longitude?: number
  mainModalityId?: string
  physicalConditionName?: string
  mentalConditionName?: string
}

interface UpdatePlayerProfileUseCaseResponse {
  player: Omit<Player, 'passwordHash'>
}

export class UpdatePlayerProfileUseCase {
  constructor(private readonly playersRepo: IPlayersRepository) {}

  async execute({
    playerId,
    ...data
  }: UpdatePlayerProfileUseCaseRequest): Promise<UpdatePlayerProfileUseCaseResponse> {
    // It should get a player by ID.
    const byId = await this.playersRepo.findById(playerId)

    // It should throw error when player not found by ID.
    if (!byId) {
      throw new ResourceNotFoundException('Player')
    }

    // It should update player with provided data.
    const updatedPlayer = await this.playersRepo.updateProfile({
      playerId,
      data,
    })

    // It should return player without passwordHash.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...safePlayer } = updatedPlayer
    return {
      player: safePlayer,
    }
  }
}
