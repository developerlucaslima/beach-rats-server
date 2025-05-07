import type { Prisma } from '@prisma/client'

import { skillTypes } from './skill-types'

export const footvolleyFundamentals: Omit<
  Prisma.SkillCreateInput,
  'modality'
>[] = [
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
    name: 'Pingo',
    skillGroup: 'fundamental',
    description:
      'Ataque de cabeçapróximo a rede tirando velocidade da bola e deixando-a cair próxima a rede.',
    skillTypes: skillTypes(['attack']),
  },
]
