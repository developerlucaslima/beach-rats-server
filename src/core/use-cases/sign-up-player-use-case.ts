import type { Player } from "@prisma/client";
import { hash } from "bcryptjs";

import type { IPlayersRepository } from "@/infrastructure/repositories/interfaces/players-repository";

import { EmailNotAvailableException } from "../errors/email-not-available-exception";

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
    // It should prevent a player register with a duplicate email.
    const byEmail = await this.playersRepo.findByEmail(email)
    if (byEmail) {
      throw new EmailNotAvailableException()
    }

    // It should hash player password upon registration.
    const hashedPassword = await hash(password, 8)

    // It should allow to register a player.
    const createdPlayer = await this.playersRepo.create({
      name,
      email,
      passwordHash: hashedPassword,
    })

    // It should return player without passwordHash.
    const { passwordHash, ...safePlayer } = createdPlayer
    return {
      player: safePlayer,
    }
  }
}