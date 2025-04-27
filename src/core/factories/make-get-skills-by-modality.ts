import { PrismaSkillsRepository } from "@/infrastructure/repositories/prisma/skills-repository";
import { GetSkillsByModalityUseCase } from "@use-cases/get-skills-by-modality-use-case";

export function makeGetSkillsByModality() {
  const prismaSkillsRepository = new PrismaSkillsRepository();

  const getSkillsByModalityUseCase = new GetSkillsByModalityUseCase(prismaSkillsRepository);
  return getSkillsByModalityUseCase;
}
