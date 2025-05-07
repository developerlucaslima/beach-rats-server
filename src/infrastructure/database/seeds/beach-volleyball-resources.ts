import { type Prisma } from '@prisma/client'

import { skillTypes } from './skill-types'

export const beachVolleyballResources: Omit<
  Prisma.SkillCreateInput,
  'modality'
>[] = [
  {
    name: 'Saque Viagem',
    skillGroup: 'resource',
    description: 'Saque potente com salto e força máxima.',
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Largada de 2ª Bola',
    skillGroup: 'resource',
    description: 'Ataque surpresa no segundo toque pelo levantador.',
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Bloqueio Simples de Tempo',
    skillGroup: 'resource',
    description: 'Bloqueio antecipando o ataque no momento exato.',
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Defesa Peixinho',
    skillGroup: 'resource',
    description: 'Defesa salvando bolas difíceis esticando o corpo no chão.',
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Pancada na Paralela',
    skillGroup: 'resource',
    description: 'Ataque potente na linha lateral da quadra.',
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Pancada na Diagonal',
    skillGroup: 'resource',
    description: 'Ataque potente cruzado para a quadra adversária.',
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Shot (Largada com Toque)',
    skillGroup: 'resource',
    description: 'Largada refinada para enganar o bloqueio adversário.',
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Levantamento de Manchete',
    skillGroup: 'resource',
    description: 'Levantamento emergencial usando manchete.',
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Ataque de Segunda',
    skillGroup: 'resource',
    description: 'Levantador atacando diretamente no segundo toque.',
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Finta de Bloqueio',
    skillGroup: 'resource',
    description: 'Fingir bloqueio para enganar o atacante adversário.',
    skillTypes: skillTypes(['defense']),
  },
]
