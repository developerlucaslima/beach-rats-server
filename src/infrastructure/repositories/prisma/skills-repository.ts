import { prisma } from "@/infrastructure/database/prisma"
import type { ISkillsRepository } from "../interfaces/skills-repository"

export class PrismaSkillsRepository implements ISkillsRepository {
  async findAllByModalityId(modalityId: string) {
    const skills = prisma.skill.findMany({
      where: {
        skillModalities:
        {
          some: {
            modalityId: modalityId
          }
        }
      },
      include: {
        skillTypes: {}
      }
    })
    return skills
  }
}
