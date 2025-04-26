import type { IPlayersRepository } from "@interfaces-repo/players-repository";

import { ResourceNotFoundException } from "@errors/resource-not-found-exception";
import type { Player } from "@app-types/players-types";

interface GetPlayerProfileUseCaseRequest {
  playerId: string
}

interface GetPlayerProfileUseCaseResponse {
  player: Omit<Player, 'passwordHash'>
}

export class GetPlayerProfileUseCase {
  constructor(private readonly playersRepo: IPlayersRepository) { }

  async execute({
    playerId,
  }: GetPlayerProfileUseCaseRequest): Promise<GetPlayerProfileUseCaseResponse> {
    // It should get a player by ID.
    const byId = await this.playersRepo.findById(playerId)

    // It should throw error when player not found by ID.
    if (!byId) {
      throw new ResourceNotFoundException('Player')
    }

    // It should return player without passwordHash.
    const { passwordHash, ...safePlayer } = byId
    return {
      player: safePlayer,
    }
  }
}