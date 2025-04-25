import { PrismaPlayerModalitiesRepository } from "@/infrastructure/repositories/prisma/player-modalities-repository";
import { PrismaPlayersRepository } from "@/repositories/prisma/players-repository";
import { GetModalitySkillsToAddUseCase } from "../use-cases/get-modality-skills-to-add-use-case";
import { PrismaSkillsRepository } from "@/infrastructure/repositories/prisma/skills-repository";

export function makeGetModalitySkillsToAdd() {
  const prismaPlayersRepository = new PrismaPlayersRepository();
  const prismaPlayerModalitiesRepository = new PrismaPlayerModalitiesRepository();
  const prismaSkillsRepository = new PrismaSkillsRepository();
  const getModalitySkillsToAddUseCase = new GetModalitySkillsToAddUseCase(prismaPlayersRepository, prismaPlayerModalitiesRepository, prismaSkillsRepository);

  return getModalitySkillsToAddUseCase;
}
