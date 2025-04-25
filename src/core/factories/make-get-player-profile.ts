import { PrismaPlayersRepository } from "@/repositories/prisma/players-repository";
import { GetPlayerProfileUseCase } from "../use-cases/get-player-profile-use-case";

export function makeGetPlayerProfile() {
  const prismaPlayersRepository = new PrismaPlayersRepository();
  const getPlayerProfileUseCase = new GetPlayerProfileUseCase(prismaPlayersRepository);

  return getPlayerProfileUseCase;
}
