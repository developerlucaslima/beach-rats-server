import { type Prisma } from '@prisma/client'

import { modalities } from './modalities'
import { skillTypes } from './skill-types'

export const beachVolleyballResources = [
  {
    name: 'Saque Viagem',
    skillGroup: 'resource',
    description: 'Saque potente com salto e força máxima.',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Largada de 2ª Bola',
    skillGroup: 'resource',
    description: 'Ataque surpresa no segundo toque pelo levantador.',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Bloqueio Simples de Tempo',
    skillGroup: 'resource',
    description: 'Bloqueio antecipando o ataque no momento exato.',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Defesa Peixinho',
    skillGroup: 'resource',
    description: 'Defesa salvando bolas difíceis esticando o corpo no chão.',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Pancada na Paralela',
    skillGroup: 'resource',
    description: 'Ataque potente na linha lateral da quadra.',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Pancada na Diagonal',
    skillGroup: 'resource',
    description: 'Ataque potente cruzado para a quadra adversária.',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Shot (Largada com Toque)',
    skillGroup: 'resource',
    description: 'Largada refinada para enganar o bloqueio adversário.',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Levantamento de Manchete',
    skillGroup: 'resource',
    description: 'Levantamento emergencial usando manchete.',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Ataque de Segunda',
    skillGroup: 'resource',
    description: 'Levantador atacando diretamente no segundo toque.',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Finta de Bloqueio',
    skillGroup: 'resource',
    description: 'Fingir bloqueio para enganar o atacante adversário.',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['defense']),
  },
] as const satisfies readonly Prisma.SkillCreateInput[]

export type ValidBeachVolleyballResourceName =
  (typeof beachVolleyballResources)[number]['name']
