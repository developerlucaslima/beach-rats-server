import type { IPlayersRepository } from "@/infrastructure/repositories/interfaces/players-repository"
import type { Skill } from "@prisma/client"
import { ResourceNotFoundException } from "../errors/resource-not-found-exception"
import type { IPlayerModalitiesRepository } from "@/infrastructure/repositories/interfaces/player-modalities-repository"
import type { ISkillsRepository } from "@/infrastructure/repositories/interfaces/skills-repository"
import { BusinessRuleException } from "../errors/business-rules-exception"

interface GetModalitySkillsToAddUseCaseRequest {
  playerId: string
  modalityId: string
}

interface GetModalitySkillsToAddUseCaseResponse {
  skillsByModality: Skill[] | null
}

export class GetModalitySkillsToAddUseCase {
  constructor(
    private readonly playersRepo: IPlayersRepository,
    private readonly playerModalitiesRepo: IPlayerModalitiesRepository,
    private readonly skillsRepo: ISkillsRepository,
  ) { }

  async execute({ playerId, modalityId }: GetModalitySkillsToAddUseCaseRequest): Promise<GetModalitySkillsToAddUseCaseResponse> {
    // It should throw ResourceNotFoundException if the player does not exist.
    const playerById = await this.playersRepo.findById(playerId)
    if (!playerById) {
      throw new ResourceNotFoundException('Player')
    }

    // It should throw BusinessRuleException when the modality is already linked to the player.
    const hasModality = await this.playerModalitiesRepo.hasModalityForPlayer({ playerId, modalityId })
    if (hasModality) throw new BusinessRuleException('Modality already linked.')

    // It should throw BusinessRuleException when the player exceeds the modality limit based on their subscription plan.
    const totalModalities = await this.playerModalitiesRepo.countModalitiesForPlayer(playerId)
    const maxModalities = playerById.subscriptionPlan === 'free' ? 2 : Infinity
    if (totalModalities >= maxModalities) {
      throw new BusinessRuleException('Modality limit reached.')
    }

    // It should throw ResourceNotFoundException if no skills are found for the given modality.
    const skillsByModality = await this.skillsRepo.findManyByModalityId(modalityId)
    if (!skillsByModality.length) {
      throw new ResourceNotFoundException('Skills for Modality')
    }

    return { skillsByModality }
  }
}