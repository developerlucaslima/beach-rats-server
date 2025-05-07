import { altinhaFundamentals } from '@database/seeds/altinha-fundamentals'
import { altinhaResources } from '@database/seeds/altinha-resources'
import { beachTennisFundamentals } from '@database/seeds/beach-tennis-fundamentals'
import { beachTennisResources } from '@database/seeds/beach-tennis-resources'
import { beachVolleyballFundamentals } from '@database/seeds/beach-volleyball-fundamentals'
import { beachVolleyballResources } from '@database/seeds/beach-volleyball-resources'
import { footvolleyFundamentals } from '@database/seeds/footvolley-fundamentals'
import { footvolleyResources } from '@database/seeds/footvolley-resources copy'
import { type Prisma, PrismaClient } from '@prisma/client'

import { countries } from '../src/infrastructure/database/seeds/countries'
import {
  modalitiesSeed,
  type ValidModalityName,
} from '../src/infrastructure/database/seeds/modalities'
import { skillTypesSeed } from '../src/infrastructure/database/seeds/skill-types'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  await prisma.country.createMany({
    data: countries,
    skipDuplicates: true,
  })

  for (const modality of modalitiesSeed) {
    await prisma.modality.upsert({
      where: { name: modality.name },
      update: {},
      create: modality,
    })
  }

  for (const skillType of skillTypesSeed) {
    await prisma.skillType.upsert({
      where: { type: skillType.type },
      update: {},
      create: skillType,
    })
  }

  await seedSkillsForModality('altinha', altinhaFundamentals)
  await seedSkillsForModality('altinha', altinhaResources)

  await seedSkillsForModality('footvolley', footvolleyFundamentals)
  await seedSkillsForModality('footvolley', footvolleyResources)

  await seedSkillsForModality('beach_volleyball', beachVolleyballFundamentals)
  await seedSkillsForModality('beach_volleyball', beachVolleyballResources)

  await seedSkillsForModality('beach_tennis', beachTennisFundamentals)
  await seedSkillsForModality('beach_tennis', beachTennisResources)

  console.log('🌱 Seeding completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })

async function seedSkillsForModality(
  name: ValidModalityName,
  skills: Omit<Prisma.SkillCreateInput, 'modality'>[],
) {
  const modality = await prisma.modality.findUniqueOrThrow({ where: { name } })

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: {
        name_modalityId: {
          name: skill.name,
          modalityId: modality.id,
        },
      },
      update: {},
      create: {
        ...skill,
        modality: { connect: { id: modality.id } },
      },
    })
  }
}
