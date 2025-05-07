import type { Prisma } from '@prisma/client'

export const modalitiesSeed = [
  {
    name: 'altinha',
    description:
      'A Brazilian beach sport focused on keeping the ball in the air with freestyle touches, emphasizing control, creativity, and teamwork.',
  },
  {
    name: 'footvolley',
    description:
      'A competitive sport that combines beach volleyball rules with soccer skills, where players use their feet, head, chest, and shoulders to play the ball over the net.',
  },
  {
    name: 'beach_tennis',
    description:
      'A fast-paced sport played on sand with paddles and a low net, combining elements of tennis and volleyball, popular for its agility and reflex demands.',
  },
  {
    name: 'beach_volleyball',
    description:
      'A team sport played on sand with two players per team, requiring high levels of coordination, jumping, and strategic ball placement to win points.',
  },
] as const satisfies Prisma.ModalityCreateInput[]

export type ValidModalityName = (typeof modalitiesSeed)[number]['name']

export const modality = (name: ValidModalityName) => ({
  connect: { name },
})
