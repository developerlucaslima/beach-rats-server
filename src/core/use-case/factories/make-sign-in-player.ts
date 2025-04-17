import { SignUpPlayerUseCase } from "@/core/use-case/sign-up-player-use-case"
import { PrismaPlayersRepository } from "@/repositories/prisma/players-repository"

export function playerSignUpFactory() {
  const playersRepository = new PrismaPlayersRepository()
  const playerSignUpUseCase = new SignUpPlayerUseCase(playersRepository)

  return playerSignUpUseCase
}