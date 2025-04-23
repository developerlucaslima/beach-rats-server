import type { IPlayersRepository } from "@/infrastructure/repositories/interfaces/players-repository";
import { compare, hash } from "bcryptjs";

import { ResourceNotFoundException } from "../errors/resource-not-found-exception";
import { InvalidCredentialsException } from "../errors/invalid-credentials-exception";

interface UpdatePlayerPasswordUseCaseRequest {
  playerId: string
  currentPassword: string
  newPassword: string
}

interface UpdatePlayerPasswordUseCaseResponse {
  success: boolean
}

export class UpdatePlayerPasswordUseCase {
  constructor(private readonly playersRepo: IPlayersRepository) { }

  async execute({
    playerId,
    currentPassword,
    newPassword,
  }: UpdatePlayerPasswordUseCaseRequest): Promise<UpdatePlayerPasswordUseCaseResponse> {
    // It should get a player by ID.
    const byId = await this.playersRepo.findById(playerId)

    // It should throw error when player not found by ID.
    if (!byId || !byId.passwordHash) {
      throw new ResourceNotFoundException('Player')
    }

    // It should prevent update password with wrong current password.
    const correctPassword = await compare(currentPassword, byId.passwordHash)
    if (!correctPassword) {
      throw new InvalidCredentialsException()
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