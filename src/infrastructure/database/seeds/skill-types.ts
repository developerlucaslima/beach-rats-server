import type { Prisma } from "@prisma/client";

export const skillTypesSeed = [
  {
    skillTypeId: 'attack',
    description: 'Skills used to score points or create offensive pressure.',
  },
  {
    skillTypeId: 'defense',
    description: 'Skills used to block, intercept, or prevent scoring.',
  },
] as const satisfies readonly Prisma.SkillTypeCreateInput[]

export type ValidSkillTypeId = typeof skillTypesSeed[number]['skillTypeId']

export const skillTypes = (types: ValidSkillTypeId[]) => ({
  create: types.map((t) => ({
    skillType: { connect: { skillTypeId: t } },
  })),
})
