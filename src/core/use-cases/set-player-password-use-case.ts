import { PasswordAlreadySetException } from '@errors/password-already-set-exception'
import { ResourceNotFoundException } from '@errors/resource-not-found-exception'
import type { IPlayersRepository } from '@repositories/interfaces/players-repository'
import { hash } from 'bcryptjs'

interface SetPlayerPasswordUseCaseRequest {
  playerId: string
  newPassword: string
}

interface SetPlayerPasswordUseCaseResponse {
  success: boolean
}

export class SetPlayerPasswordUseCase {
  constructor(private readonly playersRepo: IPlayersRepository) {}

  async execute({
    playerId,
    newPassword,
  }: SetPlayerPasswordUseCaseRequest): Promise<SetPlayerPasswordUseCaseResponse> {
    // It should throw ResourceNotFoundException if the player does not exist.
    const byId = await this.playersRepo.findById(playerId)
    if (!byId) {
      throw new ResourceNotFoundException('Player')
    }

    // It should throw PasswordAlreadySetException if the player already has a password.
    if (byId.passwordHash) {
      throw new PasswordAlreadySetException()
    }

    // It should hash the new password before saving.
    const newPasswordHash = await hash(newPassword, 8)

    // It should update the player's passwordHash in the database.
    const isUpdatedPlayer = await this.playersRepo.updatePassword({
      playerId,
      passwordHash: newPasswordHash,
    })

    // It should return success: true when the password is updated.
    return {
      success: isUpdatedPlayer,
    }
  }
}
