import { prisma } from "@/infrastructure/database/prisma"
import type { ISkillsRepository } from "@interfaces-repo/skills-repository"

export class PrismaSkillsRepository implements ISkillsRepository {
  async findById(skillId: string) {
    const skill = await prisma.skill.findUnique({
      where: { id: skillId }
    })
    return skill
  }

  async findManyByIds(skillsIds: string[]) {
    if (skillsIds.length === 0) return null
    const skills = await prisma.skill.findMany({
      where: {
        id: { in: skillsIds }
      },
      include: {
        skillTypes: {
          include: {
            skillType: true
          }
        }
      }
    })
    return skills
  }

  async findManyByModalityId(modalityId: string) {
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
        skillTypes: {
          include: {
            skillType: true
          }
        }
      }
    })
    return skills
  }
}
