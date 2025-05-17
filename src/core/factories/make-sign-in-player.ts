import { PrismaPlayersRepository } from '@repositories/prisma/players-repository'
import { SignInPlayerUseCase } from '@use-cases/sign-in-player-use-case'

export function makeSignInPlayer() {
  const prismaPlayersRepository = new PrismaPlayersRepository()

  const signInPlayerUseCase = new SignInPlayerUseCase(prismaPlayersRepository)
  return signInPlayerUseCase
}
