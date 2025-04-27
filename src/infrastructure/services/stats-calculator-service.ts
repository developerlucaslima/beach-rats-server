import type {
  Category,
  PlayerModalityStats,
  SkillIdWithCategory,
} from '@app-types/player-modality-months-stats-types'
import type { SkillWithTypes } from '@app-types/skills-types'

export interface StatsCalculatorRequest {
  skillsByModality: SkillWithTypes[]
  skillsIdsWithCategory: SkillIdWithCategory[]
}

export interface StatsCalculatorResponse {
  playerModalityStats: PlayerModalityStats
}

const CATEGORY_SCORE: Record<Category, number> = {
  none: 0,
  beginner: 25,
  intermediate: 50,
  advanced: 75,
  pro: 100,
}

const WEIGHT = {
  fundamental: 0.9,
  resource: 0.1,
}

export class StatsCalculatorService {
  async calculate({
    skillsByModality,
    skillsIdsWithCategory,
  }: StatsCalculatorRequest): Promise<StatsCalculatorResponse> {
    const skillsIdsWithCategoryMap = new Map(
      skillsIdsWithCategory.map((s) => [s.skillId, s.category]),
    )

    const bucket = () => ({ sum: 0, cnt: 0 })
    const stats = {
      fundamentalBucket: bucket(),
      attackFundamentalBucket: bucket(),
      defenseFundamentalBucket: bucket(),

      resourceBucket: bucket(),
      attackResourceBucket: bucket(),
      defenseResourceBucket: bucket(),
    }

    const registerScore = (bucketName: keyof typeof stats, score: number) => {
      stats[bucketName].sum += score
      stats[bucketName].cnt++
    }

    for (const skill of skillsByModality) {
      const score =
        CATEGORY_SCORE[skillsIdsWithCategoryMap.get(skill.id) ?? 'none']

      const attack = skill.skillTypes.some((r) => r.skillType.type === 'attack')
      const defense = skill.skillTypes.some(
        (r) => r.skillType.type === 'defense',
      )

      if (skill.skillGroup === 'fundamental') {
        registerScore('fundamentalBucket', score)
        if (attack) registerScore('attackFundamentalBucket', score)
        if (defense) registerScore('defenseFundamentalBucket', score)
      }

      if (skill.skillGroup === 'resource') {
        registerScore('resourceBucket', score)
        if (attack) registerScore('attackResourceBucket', score)
        if (defense) registerScore('defenseResourceBucket', score)
      }
    }

    const calculateAverage = (bucketName: keyof typeof stats) =>
      stats[bucketName].cnt ? stats[bucketName].sum / stats[bucketName].cnt : 0

    const fundamentalsScore = calculateAverage('fundamentalBucket')
    const resourcesScore = calculateAverage('resourceBucket')

    const attackScore =
      WEIGHT.fundamental * calculateAverage('attackFundamentalBucket') +
      WEIGHT.resource * calculateAverage('attackResourceBucket')
    const defenseScore =
      WEIGHT.fundamental * calculateAverage('defenseFundamentalBucket') +
      WEIGHT.resource * calculateAverage('defenseResourceBucket')
    const overallScore =
      WEIGHT.fundamental * fundamentalsScore + WEIGHT.resource * resourcesScore

    return {
      playerModalityStats: {
        attackScore,
        defenseScore,
        resourcesScore,
        fundamentalsScore,
        overallScore,
      },
    }
  }
}
