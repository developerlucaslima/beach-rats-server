import { AuthPlayerWithGoogleUseCase } from '@use-cases/auth-player-with-google-use-case'

import { PrismaPlayersRepository } from '@/infrastructure/repositories/prisma/players-repository'

export function makeAuthPlayerWithGoogle() {
  const prismaPlayersRepository = new PrismaPlayersRepository()

  const authPlayerWithGoogleUseCase = new AuthPlayerWithGoogleUseCase(
    prismaPlayersRepository,
  )
  return authPlayerWithGoogleUseCase
}
