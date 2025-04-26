import type { IPlayerModalitiesRepository } from "@/infrastructure/repositories/interfaces/player-modalities-repository"
import type { IPlayersRepository } from "@/infrastructure/repositories/interfaces/players-repository"
import type { StatsCalculatorService } from "@/infrastructure/services/stats-calculator-service"
import type { Category } from "@prisma/client"
import { ResourceNotFoundException } from "../errors/resource-not-found-exception"
import { BusinessRuleException } from "../errors/business-rules-exception"
import type { ISkillsRepository } from "@/infrastructure/repositories/interfaces/skills-repository"

interface AddPlayerModalityUseCaseRequest {
  playerId: string
  modalityId: string
  skillsIdsWithCategory: { skillId: string; category: Category }[]
}

interface AddPlayerModalityUseCaseResponse {
  success: boolean
}

export class AddPlayerModalityUseCase {
  constructor(
    private readonly playersRepo: IPlayersRepository,
    private readonly playerModalitiesRepo: IPlayerModalitiesRepository,
    private readonly skillsRepo: ISkillsRepository,
    private readonly statsCalculator: StatsCalculatorService
  ) { }

  async execute({
    playerId,
    modalityId,
    skillsIdsWithCategory
  }: AddPlayerModalityUseCaseRequest): Promise<AddPlayerModalityUseCaseResponse> {
    // It should throw ResourceNotFoundException if the player does not exist.
    const player = await this.playersRepo.findById(playerId)
    if (!player) {
      throw new ResourceNotFoundException('Player')
    }

    // It should throw BusinessRuleException if the modality is already linked to the player.
    const alreadyHasModality = await this.playerModalitiesRepo.hasModalityForPlayer({ playerId, modalityId })
    if (alreadyHasModality) {
      throw new BusinessRuleException('Modality already linked.')
    }

    // It should throw BusinessRuleException if the player exceeds the modality limit based on their subscription plan.
    const totalModalities = await this.playerModalitiesRepo.countModalitiesForPlayer(playerId)
    const maxModalities = player.subscriptionPlan === 'free' ? 2 : Infinity
    if (totalModalities >= maxModalities) {
      throw new BusinessRuleException('Modality limit reached.')
    }

    // It should throw ResourceNotFoundException if no skills are found for the given modality.
    const skillsByModality = await this.skillsRepo.findManyByModalityId(modalityId)
    if (!skillsByModality.length) {
      throw new ResourceNotFoundException('Skills for Modality')
    }

    // It should calculate player statistics based on provided skills.
    const { playerModalityStats } = await this.statsCalculator.calculate({
      skillsByModality,
      skillsIdsWithCategory
    })

    // It should persist player modality, stats, and skills in a single transactional flow.
    const success = await this.playerModalitiesRepo.addCompletePlayerModalityFlow({
      playerId,
      modalityId,
      skillsIdsWithCategory,
      playerModalityStats
    })

    // It should return success: true when the modality is successfully added.
    return { success }
  }
}
