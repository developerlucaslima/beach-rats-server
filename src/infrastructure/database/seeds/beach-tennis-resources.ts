import { type Prisma } from '@prisma/client'

import { skillTypes } from './skill-types'

export const beachTennisResources: Omit<Prisma.SkillCreateInput, 'modality'>[] =
  [
    {
      name: 'Saque com Efeito',
      skillGroup: 'resource',
      description:
        'Saque com spin ou slice, dificultando a recepção adversária.',
      skillTypes: skillTypes(['attack']),
    },
    {
      name: 'Smash Acrobático',
      skillGroup: 'resource',
      description: 'Smash com salto ou movimento estilizado.',
      skillTypes: skillTypes(['attack']),
    },
    {
      name: 'Lob de Defesa Perfeito',
      skillGroup: 'resource',
      description: 'Lob preciso em situação de pressão, virando o jogo.',
      skillTypes: skillTypes(['defense']),
    },
    {
      name: 'Drop Shot com Finta',
      skillGroup: 'resource',
      description: 'Simula golpe forte e aplica uma curta inesperada.',
      skillTypes: skillTypes(['attack']),
    },
    {
      name: 'Voleio de Contra-Ataque',
      skillGroup: 'resource',
      description: 'Voleio agressivo, transformando defesa em ataque imediato.',
      skillTypes: skillTypes(['attack', 'defense']),
    },
    {
      name: 'Tweener',
      skillGroup: 'resource',
      description: 'Golpe entre as pernas, usado em lobs defensivos.',
      skillTypes: skillTypes(['defense']),
    },
    {
      name: 'Slice no Voleio',
      skillGroup: 'resource',
      description: 'Efeito no voleio para quebrar o ritmo do adversário.',
      skillTypes: skillTypes(['attack']),
    },
    {
      name: 'Defesa Milagrosa',
      skillGroup: 'resource',
      description:
        'Recuperação de bolas quase perdidas com esticadas ou mergulhos.',
      skillTypes: skillTypes(['defense']),
    },
    {
      name: 'Smash de Costa',
      skillGroup: 'resource',
      description: 'Golpe acima da cabeça de costas para a quadra adversária.',
      skillTypes: skillTypes(['attack']),
    },
    {
      name: 'Saque por Baixo',
      skillGroup: 'resource',
      description: 'Saque inesperado por baixo como elemento surpresa.',
      skillTypes: skillTypes(['attack']),
    },
  ]
