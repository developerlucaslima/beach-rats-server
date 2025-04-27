export type Category = 'none' | 'beginner' | 'intermediate' | 'advanced' | 'pro'

export interface SkillIdWithCategory {
  skillId: string
  category: Category
}

export interface PlayerModalityStats {
  fundamentalsScore: number
  resourcesScore: number
  attackScore: number
  defenseScore: number
  overallScore: number
}

export interface AddCompleteModalityFlowData {
  month: Date
  playerModalityId: string
  skillsIdsWithCategory: SkillIdWithCategory[]
  playerModalityStats: PlayerModalityStats
}

export interface PlayerModalityMonthStats {
  id: string
  playerModalityId: string
  month: Date
  fundamentalsScore: number
  resourcesScore: number
  attackScore: number
  defenseScore: number
  overallScore: number
  createdAt: Date
  updatedAt: Date
}
