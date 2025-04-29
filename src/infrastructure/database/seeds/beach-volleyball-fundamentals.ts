import { type Prisma } from '@prisma/client'

import { modalities } from './modalities'
import { skillTypes } from './skill-types'

export const beachVolleyballFundamentals = [
  {
    name: 'Saque',
    skillGroup: 'fundamental',
    description: 'Execução básica do saque para iniciar o ponto.',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Recepção',
    skillGroup: 'fundamental',
    description: 'Primeiro toque para controlar o saque adversário.',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Levantamento',
    skillGroup: 'fundamental',
    description: 'Segundo toque para preparar o ataque.',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Ataque',
    skillGroup: 'fundamental',
    description: 'Terceiro toque para buscar o ponto na quadra adversária.',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Bloqueio',
    skillGroup: 'fundamental',
    description: 'Interceptação do ataque adversário na rede.',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Defesa de Ataque',
    skillGroup: 'fundamental',
    description: 'Recepção de ataques (largadas, cortadas, etc).',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Posicionamento',
    skillGroup: 'fundamental',
    description: 'Movimentação eficiente para cobrir a quadra.',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Comunicação',
    skillGroup: 'fundamental',
    description: 'Troca de informações rápidas entre os jogadores.',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Saque Flutuante',
    skillGroup: 'fundamental',
    description: 'Saque sem rotação para dificultar a recepção adversária.',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Cortada Básica',
    skillGroup: 'fundamental',
    description: 'Ataque forte direcionado para a quadra adversária.',
    skillModalities: modalities(['beach_volleyball']),
    skillTypes: skillTypes(['attack']),
  },
] as const satisfies readonly Prisma.SkillCreateInput[]

export type ValidBeachVolleyballFundamentalName =
  (typeof beachVolleyballFundamentals)[number]['name']
