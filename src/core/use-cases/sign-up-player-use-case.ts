import type { Player } from "@prisma/client";
import { hash } from "bcryptjs";

import type { IPlayersRepository } from "@/infrastructure/repositories/interfaces/players-repository";

import { EmailNotAvailableException } from "../errors/email-not-available-exception";

interface ISingUpPlayerUseCaseRequest {
  name: string
  email: string
  password: string
}

interface ISingUpPlayerUseCaseResponse {
  player: Player
}

export class SignUpPlayerUseCase {
  constructor(private readonly playersRepository: IPlayersRepository) { }

  async execute({
    name,
    email,
    password,
  }: ISingUpPlayerUseCaseRequest): Promise<ISingUpPlayerUseCaseResponse> {
    // It should hash player password upon registration.
    const passwordHash = await hash(password, 6)

    // It should prevent a player register with a duplicate email.
    const playerWithSameEmail = await this.playersRepository.findByEmail(email)
    if (playerWithSameEmail) {
      throw new EmailNotAvailableException()
    }

    // It should allow to register a player.
    const player = await this.playersRepository.create({
      name,
      email,
      passwordHash,
    })

    return {
      player,
    }
  }
}