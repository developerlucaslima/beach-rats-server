import { PrismaPlayersRepository } from '@repositories/prisma/players-repository'
import { SetPlayerPasswordUseCase } from '@use-cases/set-player-password-use-case'

export function makeSetPlayerPassword() {
  const prismaPlayersRepository = new PrismaPlayersRepository()

  const setPlayerPasswordUseCase = new SetPlayerPasswordUseCase(
    prismaPlayersRepository,
  )
  return setPlayerPasswordUseCase
}
