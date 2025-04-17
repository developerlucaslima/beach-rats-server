import type { Prisma } from "@prisma/client";

export const skillTypes: Prisma.SkillTypeCreateInput[] = [
  {
    skillTypeId: 'attack',
    description: 'Skills used to score points or create offensive pressure.',
  },
  {
    skillTypeId: 'defense',
    description: 'Skills used to block, intercept, or prevent scoring.',
  },
]