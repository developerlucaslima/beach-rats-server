import { type Prisma } from '@prisma/client'

import { skillTypes } from './skill-types'

export const beachVolleyballFundamentals: Omit<
  Prisma.SkillCreateInput,
  'modality'
>[] = [
  {
    name: 'Saque',
    skillGroup: 'fundamental',
    description: 'Execução básica do saque para iniciar o ponto.',
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Recepção',
    skillGroup: 'fundamental',
    description: 'Primeiro toque para controlar o saque adversário.',
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Levantamento',
    skillGroup: 'fundamental',
    description: 'Segundo toque para preparar o ataque.',
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Ataque',
    skillGroup: 'fundamental',
    description: 'Terceiro toque para buscar o ponto na quadra adversária.',
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Bloqueio',
    skillGroup: 'fundamental',
    description: 'Interceptação do ataque adversário na rede.',
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Defesa de Ataque',
    skillGroup: 'fundamental',
    description: 'Recepção de ataques (largadas, cortadas, etc).',
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Posicionamento',
    skillGroup: 'fundamental',
    description: 'Movimentação eficiente para cobrir a quadra.',
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Comunicação',
    skillGroup: 'fundamental',
    description: 'Troca de informações rápidas entre os jogadores.',
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Saque Flutuante',
    skillGroup: 'fundamental',
    description: 'Saque sem rotação para dificultar a recepção adversária.',
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Cortada Básica',
    skillGroup: 'fundamental',
    description: 'Ataque forte direcionado para a quadra adversária.',
    skillTypes: skillTypes(['attack']),
  },
]
