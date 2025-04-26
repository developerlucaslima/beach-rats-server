import type { IPlayersRepository } from "@interfaces-repo/players-repository"
import { ResourceNotFoundException } from "@errors/resource-not-found-exception"
import type { IPlayerModalitiesRepository } from "@interfaces-repo/player-modalities-repository"
import type { ISkillsRepository } from "@interfaces-repo/skills-repository"
import { BusinessRuleException } from "@errors/business-rules-exception"
import type { Skill } from "@app-types/skills-types"

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
    const hasModality = await this.playerModalitiesRepo.hasPlayerModality({ playerId, modalityId })
    if (hasModality) throw new BusinessRuleException('Modality already linked.')

    // It should throw BusinessRuleException when the player exceeds the modality limit based on their subscription plan.
    const totalModalities = await this.playerModalitiesRepo.countModalitiesByPlayerId(playerId)
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