import type { Player } from "@prisma/client";
import { compare } from "bcryptjs";

import type { IPlayersRepository } from "@/infrastructure/repositories/interfaces/players-repository";

import { InvalidCredentialsException } from "../errors/invalid-credentials-exception";


interface SignInPlayerUseCaseRequest {
  email: string
  password: string
}

interface SignInPlayerUseCaseResponse {
  player: Player
}

export class SignInPlayerUseCase {
  constructor(private readonly playersRepository: IPlayersRepository) { }

  async execute({
    email,
    password,
  }: SignInPlayerUseCaseRequest): Promise<SignInPlayerUseCaseResponse> {
    // It should prevent player authenticate with wrong email.
    const player = await this.playersRepository.findByEmail(email)
    if (!player) {
      throw new InvalidCredentialsException()
    }

    // It should prevent player authenticate with wrong password.
    const doesPasswordsMatch = await compare(password, player.passwordHash)
    if (!doesPasswordsMatch) {
      throw new InvalidCredentialsException()
    }

    // It should allow player authenticate.
    return {
      player,
    }
  }
}