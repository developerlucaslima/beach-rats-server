import type { Skill, SkillWithTypes } from "@app-types/skills-types"

export interface ISkillsRepository {
  findById(skillId: string): Promise<Skill | null>
  findManyByIds(skillsIds: string[]): Promise<SkillWithTypes[]>
  findManyByModalityId(modalityId: string): Promise<SkillWithTypes[]>
}
