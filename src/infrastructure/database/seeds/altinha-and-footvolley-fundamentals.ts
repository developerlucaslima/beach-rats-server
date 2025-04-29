import { type Prisma } from '@prisma/client'

import { modalities } from './modalities'
import { skillTypes } from './skill-types'

export const altinhaAndFootvolleyFundamentals = [
  {
    name: 'Ataque de Cabeça',
    skillGroup: 'fundamental',
    description: 'Cabeceio forte com precisão.',
    skillModalities: modalities(['footvolley', 'altinha']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Recepção/Passe de Cabeça',
    skillGroup: 'fundamental',
    description: 'Recepção ou levantamento com a cabeça.',
    skillModalities: modalities(['footvolley', 'altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Ombro Direito',
    skillGroup: 'fundamental',
    description: 'Recepção ou levantamento com a ombro direito.',
    skillModalities: modalities(['footvolley', 'altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Ombro Esquerdo',
    skillGroup: 'fundamental',
    description: 'Recepção ou levantamento com ombro esquerdo.',
    skillModalities: modalities(['footvolley', 'altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Peito',
    skillGroup: 'fundamental',
    description: 'Recepção ou levantamento com peito.',
    skillModalities: modalities(['footvolley', 'altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Chapa Direita',
    skillGroup: 'fundamental',
    description: 'Recepção ou levantamento com parte interna do pé direito.',
    skillModalities: modalities(['footvolley', 'altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Chapa Esquerda',
    skillGroup: 'fundamental',
    description: 'Recepção ou levantamento com parte interna do pé esquerdo.',
    skillModalities: modalities(['footvolley', 'altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Pingo',
    skillGroup: 'fundamental',
    description:
      'Ataque de cabeça, próximo a rede tirando velocidade da bola e deixando-a cair próxima a rede.',
    skillModalities: modalities(['footvolley']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Ataque pé Direto',
    description: 'Ataque com precisão e força com o pé direito.',
    skillGroup: 'resource',
    skillModalities: modalities(['altinha']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Ataque pé Esquerdo',
    description: 'Ataque com precisão e força com o pé esquerdo.',
    skillGroup: 'resource',
    skillModalities: modalities(['altinha']),
    skillTypes: skillTypes(['attack']),
  },
] as const satisfies readonly Prisma.SkillCreateInput[]

export type ValidAltinhaAndFootvolleyFundamentalName =
  (typeof altinhaAndFootvolleyFundamentals)[number]['name']
