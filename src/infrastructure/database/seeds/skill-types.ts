import type { Prisma } from '@prisma/client'

export const skillTypesSeed = [
  {
    type: 'attack',
    description: 'Skills used to score points or create offensive pressure.',
  },
  {
    type: 'defense',
    description: 'Skills used to block, intercept, or prevent scoring.',
  },
] as const satisfies Prisma.SkillTypeCreateInput[]

export type ValidSkillType = (typeof skillTypesSeed)[number]['type']

export const skillTypes = (types: ValidSkillType[]) => ({
  create: types.map((t) => ({
    skillType: { connect: { type: t } },
  })),
})
