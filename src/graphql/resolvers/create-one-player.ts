import { createPlayerSchema } from '../schemas/player.schema'
import { CreateOnePlayerUseCase } from '@/use-cases/create-one-player'
import { PrismaPlayersRepository } from '@/repositories/prisma/players-repository'

const playersRepository = new PrismaPlayersRepository()
const createOnePlayerUseCase = new CreateOnePlayerUseCase(playersRepository)

export async function createOnePlayerResolver(_: any, args: { input: any }) {
  // Validate input with Zod
  const validatedInput = createPlayerSchema.parse(args.input)

  // Execute use case with validated input
  const { player } = await createOnePlayerUseCase.execute(validatedInput)

  return player
}