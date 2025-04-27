type SkillGroupTag = 'fundamental' | 'resource'
type SkillTypeTag = 'attack' | 'defense'

export interface Skill {
  name: string
  id: string
  description: string
  skillGroup: SkillGroupTag
  createdAt: Date
  updatedAt: Date
}

export interface SkillType {
  id: string
  type: SkillTypeTag
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface SkillSkillTypeRelation {
  skillType: SkillType
  skillId: string
  typeId: string
  createdAt: Date
  updatedAt: Date
}

export interface SkillWithTypes extends Skill {
  skillTypes: SkillSkillTypeRelation[]
}
