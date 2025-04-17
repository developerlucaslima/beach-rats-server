import { PrismaClient } from "@prisma/client/extension"

import { altinhaAndFootvolleyFundamentals } from "./altinha-and-footvolley-fundamentals"
import { altinhaAndFootvolleyResources } from "./altinha-and-footvolley-resources"
import { countries } from "./countries"
import { modalities } from "./modalities"
import { skillTypes } from "./skill-types"

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  await prisma.country.createMany({
    data: countries,
    skipDuplicates: true,
  })

  for (const modality of modalities) {
    await prisma.modality.upsert({
      where: { modalityId: modality.modalityId },
      update: {},
      create: modality,
    })
  }

  for (const skillType of skillTypes) {
    await prisma.skillType.upsert({
      where: { skillTypeId: skillType.skillTypeId },
      update: {},
      create: skillType,
    })
  }

  for (const altinhaAndFootvolleyFundamental of altinhaAndFootvolleyFundamentals) {
    await prisma.skill.upsert({
      where: { name: altinhaAndFootvolleyFundamental.name },
      update: {},
      create: altinhaAndFootvolleyFundamental,
    })
  }

  for (const altinhaAndFootvolleyResource of altinhaAndFootvolleyResources) {
    await prisma.skill.upsert({
      where: { name: altinhaAndFootvolleyResource.name },
      update: {},
      create: altinhaAndFootvolleyResource,
    })
  }

  console.log('✅ Seeding completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
