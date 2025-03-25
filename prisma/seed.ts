import { PrismaClient, type Prisma } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const fundamentalsData: Prisma.FundamentalCreateInput[] = [
    {
      name: 'Ataque de Cabeça',
      abbreviation: 'ACB',
      modality: ['futevolei', 'altinha'],
      skillType: ['attack'],
      description: 'Cabeceio forte com precisão.',
    },
    {
      name: 'Recepção/Passe de Cabeça',
      abbreviation: 'DCB',
      modality: ['futevolei', 'altinha'],
      skillType: ['defense'],
      description: 'Recepção ou levantamento com a cabeça.',
    },
    {
      name: 'Ombro Direito',
      abbreviation: 'OBD',
      modality: ['futevolei', 'altinha'],
      skillType: ['defense'],
      description: 'Recepção ou levantamento com a ombro direito.',
    },
    {
      name: 'Ombro Esquerdo',
      abbreviation: 'OBE',
      modality: ['futevolei', 'altinha'],
      skillType: ['defense'],
      description: 'Recepção ou levantamento com ombro esquerdo.',
    },
    {
      name: 'Peito',
      abbreviation: 'PTO',
      modality: ['futevolei', 'altinha'],
      skillType: ['defense'],
      description: 'Recepção ou levantamento com peito.',
    },
    {
      name: 'Chapa Direita',
      abbreviation: 'CPD',
      modality: ['futevolei', 'altinha'],
      skillType: ['defense'],
      description: 'Recepção ou levantamento com parte interna do pé direito.',
    },
    {
      name: 'Chapa Esquerda',
      abbreviation: 'CPE',
      modality: ['futevolei', 'altinha'],
      skillType: ['defense'],
      description: 'Recepção ou levantamento com parte interna do pé esquerdo.',
    },
    {
      name: 'Pingo',
      abbreviation: 'PGF',
      modality: ['futevolei'],
      skillType: ['attack'],
      description: 'Ataque de cabeça, próximo a rede tirando velocidade da bola e deixando-a cair próxima a rede.',
    },
  ]

  for (const fundamental of fundamentalsData) {
    await prisma.fundamental.create({ data: fundamental })
  }

  const resourcesData: Prisma.ResourceCreateInput[] = [
    {
      name: 'Shark Attack',
      abbreviation: 'SHA',
      modality: ['futevolei', 'altinha'],
      skillType: ['attack'],
      description: 'Ataque aéreo acrobático com a parte inferior do pé',
    },
    {
      name: 'Kamikaze Attack',
      abbreviation: 'KAA',
      modality: ['futevolei', 'altinha'],
      skillType: ['attack'],
      description: 'Ataque aéreo acrobático com a parte superior do pé.',
    },
    {
      name: 'Bicicleta',
      abbreviation: 'BCL',
      modality: ['futevolei', 'altinha'],
      skillType: ['attack'],
      description: 'Ataque aéreo acrobático com a parte superior do pé simulando o ato de pedalar no ar.',
    },
    {
      name: 'Sarrada',
      abbreviation: 'SRD',
      modality: ['altinha'],
      skillType: ['attack', 'defense'],
      description: 'Recepção, levantamento ou ataque com o quadril.',
    },
    {
      name: 'Coxa Direita',
      abbreviation: 'CXD',
      modality: ['futevolei', 'altinha'],
      skillType: ['defense'],
      description: 'Recepção ou levantamento com a coxa direita.',
    },
    {
      name: 'Coxa Esquerda',
      abbreviation: 'CXE',
      modality: ['futevolei', 'altinha'],
      skillType: ['defense'],
      description: 'Recepção ou levantamento com a coxa esquerda.',
    },
    {
      name: 'Cavalo de Troia',
      abbreviation: 'CDT',
      modality: ['altinha'],
      skillType: ['attack'],
      description: 'Ataque com força e precisão utilizando joelho ou coxa.',
    },
    {
      name: 'Saque com Efeito',
      abbreviation: 'SQE',
      modality: ['futevolei'],
      skillType: ['attack'],
      description: 'Saque com técnicas que conferem dificuldade na recepção adversaria.',
    },
    {
      name: 'Pingo com Finta',
      abbreviation: 'PGF',
      modality: ['futevolei'],
      skillType: ['attack'],
      description: 'Ataque imprevisível, próximo a rede tirando velocidade da bola e deixando-a cair próxima a rede.',
    },
    {
      name: 'Chilena Direita',
      abbreviation: 'CHD',
      modality: ['futevolei', 'altinha'],
      skillType: ['defense'],
      description: 'Recepção ou levantamento com parte externa do pé direito.',
    },
    {
      name: 'Chilena Esquerda',
      abbreviation: 'CHE',
      modality: ['futevolei', 'altinha'],
      skillType: ['defense'],
      description: 'Recepção ou levantamento com parte externa do pé esquerdo.',
    },
    {
      name: 'Peito do pé Direito',
      abbreviation: 'PPD',
      modality: ['futevolei', 'altinha'],
      skillType: ['defense'],
      description: 'Recepção ou levantamento com parte superior do pé direito.',
    },
    {
      name: 'Peito do pé Esquerdo',
      abbreviation: 'PPE',
      modality: ['futevolei', 'altinha'],
      skillType: ['defense'],
      description: 'Recepção ou levantamento com parte superior do pé esquerdo.',
    },
    {
      name: 'Ataque pé Direto',
      abbreviation: 'APD',
      modality: ['altinha'],
      skillType: ['attack'],
      description: 'Ataque com precisão e força com o pé direito.',
    },
    {
      name: 'Ataque pé Esquerdo',
      abbreviation: 'APE',
      modality: ['altinha'],
      skillType: ['attack'],
      description: 'Ataque com precisão e força com o pé direito.',
    },
    {
      name: 'Levantamento de Letra',
      abbreviation: 'LVL',
      modality: ['altinha'],
      skillType: ['defense'],
      description: 'Recepção ou levantamento utilizando o pé entrelaçado.',
    },
    {
      name: 'Ataque de Letra',
      abbreviation: 'ATL',
      modality: ['altinha'],
      skillType: ['attack'],
      description: 'Ataque com força e precisão utilizando o pé entrelaçado.',
    },
    {
      name: 'Ataque de Ombro',
      abbreviation: 'AOM',
      modality: ['altinha'],
      skillType: ['attack'],
      description: 'Ataque com força e precisão com o ombro.',
    },
    {
      name: 'Escorpião',
      abbreviation: 'ESC',
      modality: ['altinha'],
      skillType: ['defense'],
      description: 'Recepção ou levantamento utilizando o calcanhar.',
    },
    {
      name: 'Cola no peito',
      abbreviation: 'CLP',
      modality: ['altinha'],
      skillType: ['defense'],
      description: 'Recepção dominando totalmente a bola no peito.',
    },
    {
      name: 'Cola no pé',
      abbreviation: 'CLP',
      modality: ['altinha'],
      skillType: ['defense'],
      description: 'Recepção dominando totalmente a bola no pé.',
    },
    {
      name: 'Dois Tempos',
      abbreviation: 'DST',
      modality: ['altinha'],
      skillType: ['attack', 'defense'],
      description: 'Recepção seguida de ataque em apenas dois movimentos rápidos.',
    },
    {
      name: 'Eclipse',
      abbreviation: 'ECL',
      modality: ['altinha'],
      skillType: ['defense'],
      description: 'Recepção aérea dominando e controlando totalmente a bola com a parte interna do pé enquanto passa o outro pé pela frente, criando um efeito de "eclipse".',
    },
  ]

  for (const resource of resourcesData) {
    await prisma.resource.create({ data: resource })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
