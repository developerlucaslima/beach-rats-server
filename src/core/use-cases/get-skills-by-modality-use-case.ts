import type { IPlayersRepository } from "@repositories/interfaces/players-repository"
import { ResourceNotFoundException } from "@errors/resource-not-found-exception"
import type { ISkillsRepository } from "@repositories/interfaces/skills-repository"
import type { Skill } from "@app-types/skills-types"

interface GetSkillsByModalityUseCaseRequest {
  modalityId: string
}

interface GetSkillsByModalityUseCaseResponse {
  skillsByModalityId: Skill[]
}

export class GetSkillsByModalityUseCase {
  constructor(
    private readonly playersRepo: IPlayersRepository,
    private readonly skillsRepo: ISkillsRepository,
  ) { }

  async execute({ modalityId }: GetSkillsByModalityUseCaseRequest): Promise<GetSkillsByModalityUseCaseResponse> {
    // It should return an empty array if no skills are found for the given modality.
    const skillsByModalityId = await this.skillsRepo.findManyByModalityId(modalityId)

    return { skillsByModalityId }
  }
}