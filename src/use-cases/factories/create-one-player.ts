import { PrismaPlayersRepository } from "@/repositories/prisma/players-repository"
import { CreateOnePlayerUseCase } from "../create-one-player"


const playersRepository = new PrismaPlayersRepository()
const createOnePlayerUseCase = new CreateOnePlayerUseCase(playersRepository)

export function createOnePlayerFactory() {
  return createOnePlayerUseCase
}