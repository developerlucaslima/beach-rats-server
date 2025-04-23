import type { IPlayersRepository } from "@/infrastructure/repositories/interfaces/players-repository";
import { hash } from "bcryptjs";

import { ResourceNotFoundException } from "../errors/resource-not-found-exception";
import { PasswordAlreadySetException } from "../errors/password-already-set-exception";

interface SetPlayerPasswordUseCaseRequest {
  playerId: string
  newPassword: string
}

interface SetPlayerPasswordUseCaseResponse {
  success: boolean
}

export class SetPlayerPasswordUseCase {
  constructor(private readonly playersRepo: IPlayersRepository) { }

  async execute({
    playerId,
    newPassword,
  }: SetPlayerPasswordUseCaseRequest): Promise<SetPlayerPasswordUseCaseResponse> {
    // It should get a player by ID.
    const byId = await this.playersRepo.findById(playerId)

    // It should throw error when player not found by ID.
    if (!byId) {
      throw new ResourceNotFoundException('Player')
    }

    // It should throw error when player already has a password.
    if (byId.passwordHash) {
      throw new PasswordAlreadySetException()
    }

    // It should hash player new password.
    const newPasswordHash = await hash(newPassword, 8)

    // It should update player with provided data.
    const isUpdatedPlayer = await this.playersRepo.updatePassword({ playerId, passwordHash: newPasswordHash })

    // It should return true or false.
    return {
      success: isUpdatedPlayer,
    }
  }
}