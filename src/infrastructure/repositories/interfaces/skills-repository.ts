import type { Skill } from "@prisma/client";

export interface ISkillsRepository {
  findById(skillId: string): Promise<Skill | null>
  findManyByIds(skillsIds: string[]): Promise<Skill[] | null>
  findManyByModalityId(modalityId: string): Promise<Skill[] | null>
}
