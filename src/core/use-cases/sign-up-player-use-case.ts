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
  player: Player
}

export class SignUpPlayerUseCase {
  constructor(private readonly playersRepo: IPlayersRepository) { }

  async execute({
    name,
    email,
    password,
  }: SignUpPlayerUseCaseRequest): Promise<SignUpPlayerUseCaseResponse> {
    // It should prevent a player register with a duplicate email.
    const playerWithSameEmail = await this.playersRepo.findByEmail(email)
    if (playerWithSameEmail) {
      throw new EmailNotAvailableException()
    }

    // It should hash player password upon registration.
    const passwordHash = await hash(password, 6)

    // It should allow to register a player.
    const player = await this.playersRepo.create({
      name,
      email,
      passwordHash,
    })

    return {
      player,
    }
  }
}