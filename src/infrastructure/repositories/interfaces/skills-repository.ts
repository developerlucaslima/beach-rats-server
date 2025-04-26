import type { Skill } from "@prisma/client";
import type { SkillWithSkillTypes } from "../types/skills-types";

export interface ISkillsRepository {
  findById(skillId: string): Promise<Skill | null>
  findManyByIds(skillsIds: string[]): Promise<SkillWithSkillTypes[]>
  findManyByModalityId(modalityId: string): Promise<SkillWithSkillTypes[]>
}
