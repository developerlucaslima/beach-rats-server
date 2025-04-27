import { PrismaPlayerModalitiesRepository } from "@/infrastructure/repositories/prisma/player-modalities-repository";
import { PrismaPlayersRepository } from "@repositories/prisma/players-repository";
import { AddPlayerModalityUseCase } from "@use-cases/add-player-modality-use-case";

export function makeAddPlayerModality() {
  const prismaPlayersRepository = new PrismaPlayersRepository();
  const prismaPlayerModalitiesRepository = new PrismaPlayerModalitiesRepository();

  const addPlayerModalityUseCase = new AddPlayerModalityUseCase(prismaPlayersRepository, prismaPlayerModalitiesRepository);
  return addPlayerModalityUseCase;
}
