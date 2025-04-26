import type { IPlayerModalitiesRepository } from "@/infrastructure/repositories/interfaces/player-modalities-repository"
import type { IPlayersRepository } from "@/infrastructure/repositories/interfaces/players-repository"
import { ResourceNotFoundException } from "@/errors/resource-not-found-exception"
import { BusinessRuleException } from "@/errors/business-rules-exception"
import type { PlayerModality } from "@/types/player-modalities-types"

interface AddPlayerModalityUseCaseRequest {
  playerId: string
  modalityId: string
}

interface AddPlayerModalityUseCaseResponse {
  playerModality: PlayerModality
}

export class AddPlayerModalityUseCase {
  constructor(
    private readonly playersRepo: IPlayersRepository,
    private readonly playerModalitiesRepo: IPlayerModalitiesRepository,
  ) { }

  async execute({
    playerId,
    modalityId,
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

    // It should set the modality as main when adding the first modality.
    const isFirstModality = totalModalities === 0
    const playerModality = isFirstModality
      ? await this.playerModalitiesRepo.addAsMainModality({ modalityId, playerId })
      // It should not set as main when the player already has at least one modality.
      : await this.playerModalitiesRepo.add({ modalityId, playerId })

    // It should return the created playerModality when the modality is successfully added.
    return { playerModality }
  }
}
