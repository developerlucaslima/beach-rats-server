import { type Prisma } from '@prisma/client'

import { modalities } from './modalities'
import { skillTypes } from './skill-types'

export const beachTennisFundamentals = [
  {
    name: 'Saque',
    skillGroup: 'fundamental',
    description: 'Execução básica do saque, iniciando o ponto.',
    skillModalities: modalities(['beach_tennis']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Forehand',
    skillGroup: 'fundamental',
    description: 'Golpe básico com a mão dominante.',
    skillModalities: modalities(['beach_tennis']),
    skillTypes: skillTypes(['attack', 'defense']),
  },
  {
    name: 'Backhand',
    skillGroup: 'fundamental',
    description: 'Golpe com a mão não-dominante ou com duas mãos.',
    skillModalities: modalities(['beach_tennis']),
    skillTypes: skillTypes(['attack', 'defense']),
  },
  {
    name: 'Voleio',
    skillGroup: 'fundamental',
    description: 'Golpe próximo à rede para interceptar a bola.',
    skillModalities: modalities(['beach_tennis']),
    skillTypes: skillTypes(['attack', 'defense']),
  },
  {
    name: 'Smash',
    skillGroup: 'fundamental',
    description: 'Golpe ofensivo acima da cabeça, finalizando o ponto.',
    skillModalities: modalities(['beach_tennis']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Lob',
    skillGroup: 'fundamental',
    description: 'Bola alta e profunda para recuar o adversário.',
    skillModalities: modalities(['beach_tennis']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Defesa de Smash',
    skillGroup: 'fundamental',
    description: 'Recepção de bolas potentes com reflexo rápido.',
    skillModalities: modalities(['beach_tennis']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Posicionamento',
    skillGroup: 'fundamental',
    description: 'Movimentação eficiente para cobertura da quadra.',
    skillModalities: modalities(['beach_tennis']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Saída de Saque',
    skillGroup: 'fundamental',
    description: 'Preparação e resposta imediata após o saque.',
    skillModalities: modalities(['beach_tennis']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Drop Shot Básico',
    skillGroup: 'fundamental',
    description: 'Bola curta e sutil, caindo próxima à rede.',
    skillModalities: modalities(['beach_tennis']),
    skillTypes: skillTypes(['attack']),
  },
] as const satisfies readonly Prisma.SkillCreateInput[]

export type ValidBeachTennisFundamentalName =
  (typeof beachTennisFundamentals)[number]['name']
