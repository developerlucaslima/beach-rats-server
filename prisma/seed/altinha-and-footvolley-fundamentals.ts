import { type Prisma } from '@prisma/client'

const altinhaId = 'altinha'
const footvolleyId = 'footvolley'
const attackType = 'attack'
const defenseType = 'defense'

const modalities = (mods: string[]) => ({
  create: mods.map((m) => ({
    modality: { connect: { modalityId: m === 'futevolei' ? footvolleyId : altinhaId } },
  })),
})

const skillTypes = (types: string[]) => ({
  create: types.map((t) => ({
    skillType: { connect: { skillTypeId: t === 'attack' ? attackType : defenseType } },
  })),
})

export const altinhaAndFootvolleyFundamentals: Prisma.SkillCreateInput[] = [
  {
    name: 'Ataque de Cabeça',
    skillGroup: 'fundamental',
    description: 'Cabeceio forte com precisão.',
    skillModalities: modalities(['futevolei', 'altinha']),
    skillTypes: skillTypes(['attack']),
  },
  {
    name: 'Recepção/Passe de Cabeça',
    skillGroup: 'fundamental',
    description: 'Recepção ou levantamento com a cabeça.',
    skillModalities: modalities(['futevolei', 'altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Ombro Direito',
    skillGroup: 'fundamental',
    description: 'Recepção ou levantamento com a ombro direito.',
    skillModalities: modalities(['futevolei', 'altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Ombro Esquerdo',
    skillGroup: 'fundamental',
    description: 'Recepção ou levantamento com ombro esquerdo.',
    skillModalities: modalities(['futevolei', 'altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Peito',
    skillGroup: 'fundamental',
    description: 'Recepção ou levantamento com peito.',
    skillModalities: modalities(['futevolei', 'altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Chapa Direita',
    skillGroup: 'fundamental',
    description: 'Recepção ou levantamento com parte interna do pé direito.',
    skillModalities: modalities(['futevolei', 'altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Chapa Esquerda',
    skillGroup: 'fundamental',
    description: 'Recepção ou levantamento com parte interna do pé esquerdo.',
    skillModalities: modalities(['futevolei', 'altinha']),
    skillTypes: skillTypes(['defense']),
  },
  {
    name: 'Pingo',
    skillGroup: 'fundamental',
    description: 'Ataque de cabeça, próximo a rede tirando velocidade da bola e deixando-a cair próxima a rede.',
    skillModalities: modalities(['futevolei']),
    skillTypes: skillTypes(['attack']),
  },
]
