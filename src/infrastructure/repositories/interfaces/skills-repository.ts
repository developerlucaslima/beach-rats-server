import type { PlayerModality, Prisma, Skill } from "@prisma/client";

export interface ISkillsRepository {
  findAllByModalityId(modalityId: string): Promise<Skill[] | null>
}
