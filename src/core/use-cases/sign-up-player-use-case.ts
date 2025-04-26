import { hash } from "bcryptjs";

import type { IPlayersRepository } from "@interfaces-repo/players-repository";

import { EmailNotAvailableException } from "@errors/email-not-available-exception";
import type { Player } from "@app-types/players-types";

interface SignUpPlayerUseCaseRequest {
  name: string
  email: string
  password: string
}

interface SignUpPlayerUseCaseResponse {
  player: Omit<Player, 'passwordHash'>
}

export class SignUpPlayerUseCase {
  constructor(private readonly playersRepo: IPlayersRepository) { }

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
    const { passwordHash, ...safePlayer } = createdPlayer
    return {
      player: safePlayer,
    }
  }
}