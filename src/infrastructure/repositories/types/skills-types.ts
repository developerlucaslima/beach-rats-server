import type {
  Skill,
  SkillSkillTypeRelation,
  SkillType,
} from '@prisma/client'

export type SkillWithSkillTypes = Skill & {
  skillTypes: (SkillSkillTypeRelation & {
    skillType: SkillType
  })[]
}