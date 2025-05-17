import type { Player } from '@app-types/players-types'
import { EmailNotAvailableException } from '@errors/email-not-available-exception'
import type { IPlayersRepository } from '@repositories/interfaces/players-repository'
import { hash } from 'bcryptjs'

interface SignUpPlayerUseCaseRequest {
  name: string
  email: string
  password: string
}

interface SignUpPlayerUseCaseResponse {
  player: Omit<Player, 'passwordHash'>
}

export class SignUpPlayerUseCase {
  constructor(private readonly playersRepo: IPlayersRepository) {}

  async execute({
    name,
    email,
    password,
  }: SignUpPlayerUseCaseRequest): Promise<SignUpPlayerUseCaseResponse> {
    // It should throw EmailNotAvailableException if the email is already registered.
    const byEmail = await this.playersRepo.findByEmail(email)
    if (byEmail) {
      throw new EmailNotAvailableException()
    }

    // It should hash the password before creating the player.
    const hashedPassword = await hash(password, 8)

    // It should create a new player with hashed password.
    const createdPlayer = await this.playersRepo.create({
      name,
      email,
      passwordHash: hashedPassword,
    })

    // It should return the created player without the passwordHash.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...safePlayer } = createdPlayer
    return {
      player: safePlayer,
    }
  }
}
