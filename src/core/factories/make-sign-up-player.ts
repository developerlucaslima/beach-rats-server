import { PrismaPlayersRepository } from "@/repositories/prisma/players-repository"
import { SignUpPlayerUseCase } from "@/use-cases/sign-up-player-use-case"

export function playerSignUpFactory() {
  const playersRepository = new PrismaPlayersRepository()
  const playerSignUpUseCase = new SignUpPlayerUseCase(playersRepository)

  return playerSignUpUseCase
}