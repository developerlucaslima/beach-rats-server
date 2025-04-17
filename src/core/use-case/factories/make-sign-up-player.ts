import { SignInPlayerUseCase } from "@/core/use-case/sign-in-player-use-case"
import { PrismaPlayersRepository } from "@/repositories/prisma/players-repository"

export function playerSignInFactory() {
  const playersRepository = new PrismaPlayersRepository()
  const playerSignInUseCase = new SignInPlayerUseCase(playersRepository)

  return playerSignInUseCase
}