import { PrismaPlayersRepository } from '@repositories/prisma/players-repository'
import { UpdatePlayerPasswordUseCase } from '@use-cases/update-player-password-use-case'

export function makeUpdatePlayerPassword() {
  const prismaPlayersRepository = new PrismaPlayersRepository()

  const updatePlayerPasswordUseCase = new UpdatePlayerPasswordUseCase(
    prismaPlayersRepository,
  )
  return updatePlayerPasswordUseCase
}
