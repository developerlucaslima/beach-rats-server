import { type Prisma } from '@prisma/client'

import { modalities } from './modalities'
import { skillTypes } from './skill-types'

export const altinhaAndFootvolleyResources = [
  {
    name: 'Shark Attack',
    skillGroup: 'resource',
    description: 'Ataque aéreo acrobático com a parte inferior do pé',
    skillModalities: modalities(['footvolley', 'altinha']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Kamikaze Attack',
    description: 'Ataque aéreo acrobático com a parte superior do pé.',
    skillGroup: 'resource',
    skillModalities: modalities(['footvolley', 'altinha']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Bicicleta',
    description:
      'Ataque aéreo acrobático com a parte superior do pé simulando o ato de pedalar no ar.',
    skillGroup: 'resource',
    skillModalities: modalities(['footvolley', 'altinha']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Sarrada',
    description: 'Recepção, levantamento ou ataque com o quadril.',
    skillGroup: 'resource',
    skillModalities: modalities(['altinha']),
    skillTypes: skillTypes(['attack', 'defense']),
  },
  {
    name: 'Coxa Direita',
    description: 'Recepção ou levantamento com a coxa direita.',
    skillGroup: 'resource',
    skillModalities: modalities(['footvolley', 'altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Coxa Esquerda',
    description: 'Recepção ou levantamento com a coxa esquerda.',
    skillGroup: 'resource',
    skillModalities: modalities(['footvolley', 'altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Cavalo de Troia',
    description: 'Ataque com força e precisão utilizando joelho ou coxa.',
    skillGroup: 'resource',
    skillModalities: modalities(['altinha']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Saque com Efeito',
    description:
      'Saque com técnicas que conferem dificuldade na recepção adversaria.',
    skillGroup: 'resource',
    skillModalities: modalities(['footvolley']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Pingo com Finta',
    description:
      'Ataque imprevisível, próximo a rede tirando velocidade da bola e deixando-a cair próxima a rede.',
    skillGroup: 'resource',
    skillModalities: modalities(['footvolley']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Chilena Direita',
    description: 'Recepção ou levantamento com parte externa do pé direito.',
    skillGroup: 'resource',
    skillModalities: modalities(['footvolley', 'altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Chilena Esquerda',
    description: 'Recepção ou levantamento com parte externa do pé esquerdo.',
    skillGroup: 'resource',
    skillModalities: modalities(['footvolley', 'altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Peito do pé Direito',
    description: 'Recepção ou levantamento com parte superior do pé direito.',
    skillGroup: 'resource',
    skillModalities: modalities(['footvolley', 'altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Peito do pé Esquerdo',
    description: 'Recepção ou levantamento com parte superior do pé esquerdo.',
    skillGroup: 'resource',
    skillModalities: modalities(['footvolley', 'altinha']),
    skillTypes: skillTypes(['defense']),
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
    description: 'Ataque com precisão e força com o pé direito.',
    skillGroup: 'resource',
    skillModalities: modalities(['altinha']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Levantamento de Letra',
    description: 'Recepção ou levantamento utilizando o pé entrelaçado.',
    skillGroup: 'resource',
    skillModalities: modalities(['altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Ataque de Letra',
    description: 'Ataque com força e precisão utilizando o pé entrelaçado.',
    skillGroup: 'resource',
    skillModalities: modalities(['altinha']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Ataque de Ombro',
    description: 'Ataque com força e precisão com o ombro.',
    skillGroup: 'resource',
    skillModalities: modalities(['altinha']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Escorpião',
    description: 'Recepção ou levantamento utilizando o calcanhar.',
    skillGroup: 'resource',
    skillModalities: modalities(['altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Cola no peito',
    description: 'Recepção dominando totalmente a bola no peito.',
    skillGroup: 'resource',
    skillModalities: modalities(['altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Cola no pé',
    description: 'Recepção dominando totalmente a bola no pé.',
    skillGroup: 'resource',
    skillModalities: modalities(['altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Dois Tempos',
    description:
      'Recepção seguida de ataque em apenas dois movimentos rápidos.',
    skillGroup: 'resource',
    skillModalities: modalities(['altinha']),
    skillTypes: skillTypes(['attack', 'defense']),
  },
  {
    name: 'Eclipse',
    description:
      'Recepção aérea dominando e controlando totalmente a bola com a parte interna do pé enquanto passa o outro pé pela frente, criando um efeito de "eclipse".',
    skillGroup: 'resource',
    skillModalities: modalities(['altinha']),
    skillTypes: skillTypes(['defense']),
  },
] as const satisfies readonly Prisma.SkillCreateInput[]

export type ValidAltinhaAndFootvolleyResourceName =
  (typeof altinhaAndFootvolleyResources)[number]['name']
