import type { IPlayersRepository } from "@repositories/interfaces/players-repository";

import { EmailNotAvailableException } from "@errors/email-not-available-exception";
import type { Player } from "@app-types/players-types";

interface AuthPlayerWithGoogleUseCaseRequest {
  name: string
  email: string
  googleId: string
  avatarUrl?: string
}

interface AuthPlayerWithGoogleUseCaseResponse {
  player: Omit<Player, 'passwordHash'>
}

export class AuthPlayerWithGoogleUseCase {
  constructor(private readonly playersRepo: IPlayersRepository) { }

  async execute({
    name,
    email,
    googleId,
    avatarUrl,
  }: AuthPlayerWithGoogleUseCaseRequest): Promise<AuthPlayerWithGoogleUseCaseResponse> {
    // It should prevent a player register with a duplicate googleId.
    const byGoogleId = await this.playersRepo.findByGoogleId(googleId)
    if (byGoogleId) {
      return { player: byGoogleId }
    }

    // It should attach googleId to an existing email account.
    const byEmail = await this.playersRepo.findByEmail(email)
    if (byEmail) {
      if (byEmail.googleId && byEmail.googleId !== googleId) {
        // It should prevent a player register with a duplicate email.
        throw new EmailNotAvailableException()
      }

      const updated = await this.playersRepo.attachGoogleAccount({
        playerId: byEmail.id,
        googleId,
        avatarUrl,
      })
      return { player: updated }
    }

    // It should allow to register a player.
    const createdPlayer = await this.playersRepo.create({
      name,
      email,
      googleId,
      avatarUrl,
    })

    // It should return player without passwordHash.
    const { passwordHash, ...safePlayer } = createdPlayer
    return {
      player: safePlayer,
    }
  }
}