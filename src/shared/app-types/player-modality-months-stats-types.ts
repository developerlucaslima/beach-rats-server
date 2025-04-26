import type { Category } from "@prisma/client";

export interface SkillIdWithCategory {
  skillId: string;
  category: Category
}

export interface PlayerModalityMonthStats {
  attackScore: number
  defenseScore: number
  fundamentalsScore: number
  resourcesScore: number
  overallScore: number
}

export interface AddCompleteModalityFlowData {
  playerId: string
  modalityId: string
  skillsIdsWithCategory: SkillIdWithCategory[]
  playerModalityStats: PlayerModalityMonthStats
}