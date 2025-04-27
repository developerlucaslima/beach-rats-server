import { PrismaPlayersRepository } from "@repositories/prisma/players-repository";
import { UpdatePlayerProfileUseCase } from "@use-cases/update-player-profile-use-case";

export function makeUpdatePlayerProfile() {
  const prismaPlayersRepository = new PrismaPlayersRepository();

  const updatePlayerProfileUseCase = new UpdatePlayerProfileUseCase(prismaPlayersRepository);
  return updatePlayerProfileUseCase;
}
