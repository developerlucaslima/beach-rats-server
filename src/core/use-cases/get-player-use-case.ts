import type { Player } from "@prisma/client";

import type { IPlayersRepository } from "@/infrastructure/repositories/interfaces/players-repository";

import { ResourceNotFoundException } from "../errors/resource-not-found-exception";

interface GetPlayerUseCaseRequest {
  playerId: string
}

interface GetPlayerUseCaseResponse {
  player: Omit<Player, 'passwordHash'>
}

export class GetPlayerUseCase {
  constructor(private readonly playersRepo: IPlayersRepository) { }

  async execute({
    playerId,
  }: GetPlayerUseCaseRequest): Promise<GetPlayerUseCaseResponse> {
    // It should get a player by ID.
    const byId = await this.playersRepo.findById(playerId)

    // It should throw error when player not found by ID.
    if (!byId) {
      throw new ResourceNotFoundException()
    }

    // It should return player without passwordHash.
    const { passwordHash, ...player } = byId
    return {
      player,
    }
  }
}