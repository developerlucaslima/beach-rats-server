import { type Prisma } from '@prisma/client'

import { skillTypes } from './skill-types'

export const altinhaFundamentals: Omit<Prisma.SkillCreateInput, 'modality'>[] =
  [
    {
      name: 'Ataque de Cabeça',
      skillGroup: 'fundamental',
      description: 'Cabeceio forte com precisão.',
      skillTypes: skillTypes(['attack']),
    },
    {
      name: 'Recepção/Passe de Cabeça',
      skillGroup: 'fundamental',
      description: 'Recepção ou levantamento com a cabeça.',
      skillTypes: skillTypes(['defense']),
    },
    {
      name: 'Ombro Direito',
      skillGroup: 'fundamental',
      description: 'Recepção ou levantamento com a ombro direito.',
      skillTypes: skillTypes(['defense']),
    },
    {
      name: 'Ombro Esquerdo',
      skillGroup: 'fundamental',
      description: 'Recepção ou levantamento com ombro esquerdo.',
      skillTypes: skillTypes(['defense']),
    },
    {
      name: 'Peito',
      skillGroup: 'fundamental',
      description: 'Recepção ou levantamento com peito.',
      skillTypes: skillTypes(['defense']),
    },
    {
      name: 'Chapa Direita',
      skillGroup: 'fundamental',
      description: 'Recepção ou levantamento com parte interna do pé direito.',
      skillTypes: skillTypes(['defense']),
    },
    {
      name: 'Chapa Esquerda',
      skillGroup: 'fundamental',
      description: 'Recepção ou levantamento com parte interna do pé esquerdo.',
      skillTypes: skillTypes(['defense']),
    },

    {
      name: 'Ataque pé Direto',
      description: 'Ataque com precisão e força com o pé direito.',
      skillGroup: 'resource',
      skillTypes: skillTypes(['attack']),
    },
    {
      name: 'Ataque pé Esquerdo',
      description: 'Ataque com precisão e força com o pé esquerdo.',
      skillGroup: 'resource',
      skillTypes: skillTypes(['attack']),
    },
  ]
