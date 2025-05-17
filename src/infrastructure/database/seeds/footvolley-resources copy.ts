import { type Prisma } from '@prisma/client'

import { skillTypes } from './skill-types'

export const footvolleyResources: Omit<Prisma.SkillCreateInput, 'modality'>[] =
  [
    {
      name: 'Shark Attack',
      skillGroup: 'resource',
      description: 'Ataque aéreo acrobático com a parte inferior do pé',
      skillTypes: skillTypes(['attack']),
    },
    {
      name: 'Kamikaze Attack',
      description: 'Ataque aéreo acrobático com a parte superior do pé.',
      skillGroup: 'resource',
      skillTypes: skillTypes(['attack']),
    },
    {
      name: 'Bicicleta',
      description:
        'Ataque aéreo acrobático com a parte superior do pé simulando o ato de pedalar no ar.',
      skillGroup: 'resource',
      skillTypes: skillTypes(['attack']),
    },

    {
      name: 'Coxa Direita',
      description: 'Recepção ou levantamento com a coxa direita.',
      skillGroup: 'resource',
      skillTypes: skillTypes(['defense']),
    },
    {
      name: 'Coxa Esquerda',
      description: 'Recepção ou levantamento com a coxa esquerda.',
      skillGroup: 'resource',
      skillTypes: skillTypes(['defense']),
    },

    {
      name: 'Saque com Efeito',
      description:
        'Saque com técnicas que conferem dificuldade na recepção adversaria.',
      skillGroup: 'resource',
      skillTypes: skillTypes(['attack']),
    },
    {
      name: 'Pingo com Finta',
      description:
        'Ataque imprevisível, próximo a rede tirando velocidade da bola e deixando-a cair próxima a rede.',
      skillGroup: 'resource',
      skillTypes: skillTypes(['attack']),
    },
    {
      name: 'Chilena Direita',
      description: 'Recepção ou levantamento com parte externa do pé direito.',
      skillGroup: 'resource',
      skillTypes: skillTypes(['defense']),
    },
    {
      name: 'Chilena Esquerda',
      description: 'Recepção ou levantamento com parte externa do pé esquerdo.',
      skillGroup: 'resource',
      skillTypes: skillTypes(['defense']),
    },
    {
      name: 'Peito do pé Direito',
      description: 'Recepção ou levantamento com parte superior do pé direito.',
      skillGroup: 'resource',
      skillTypes: skillTypes(['defense']),
    },
    {
      name: 'Peito do pé Esquerdo',
      description:
        'Recepção ou levantamento com parte superior do pé esquerdo.',
      skillGroup: 'resource',
      skillTypes: skillTypes(['defense']),
    },
  ]
