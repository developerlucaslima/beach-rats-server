import type { Player } from '@app-types/players-types'
import { InvalidCredentialsException } from '@errors/invalid-credentials-exception'
import type { IPlayersRepository } from '@repositories/interfaces/players-repository'
import { compare } from 'bcryptjs'

interface SignInPlayerUseCaseRequest {
  email: string
  password: string
}

interface SignInPlayerUseCaseResponse {
  player: Omit<Player, 'passwordHash'>
}

export class SignInPlayerUseCase {
  constructor(private readonly playersRepo: IPlayersRepository) {}

  async execute({
    email,
    password,
  }: SignInPlayerUseCaseRequest): Promise<SignInPlayerUseCaseResponse> {
    // It should prevent player authenticate with wrong email.
    const byEmail = await this.playersRepo.findByEmail(email)
    if (!byEmail) {
      throw new InvalidCredentialsException()
    }

    // It should prevent player authenticate with wrong password.
    const correctPassword = await compare(password, byEmail.passwordHash)
    if (!correctPassword) {
      throw new InvalidCredentialsException()
    }

    // It should return player without passwordHash.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...safePlayer } = byEmail
    return {
      player: safePlayer,
    }
  }
}
