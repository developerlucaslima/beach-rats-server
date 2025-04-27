import type { Category } from "@app-types/player-modality-months-stats-types";
import { BusinessRuleException } from "@errors/business-rules-exception";
import { ResourceNotFoundException } from "@errors/resource-not-found-exception";
import type { IPlayerModalitiesRepository } from "@repositories/interfaces/player-modalities-repository";
import type { IPlayerModalityMonthsStatsRepository } from "@repositories/interfaces/player-modality-months-stats-repository";
import type { ISkillsRepository } from "@repositories/interfaces/skills-repository";
import type { StatsCalculatorService } from "@services/stats-calculator-service";

interface UpsertPlayerMonthlyStatsUseCaseRequest {
  playerId: string;
  modalityId: string;
  month: Date;
  skillsIdsWithCategory: { skillId: string; category: Category }[];
}

interface UpsertPlayerMonthlyStatsUseCaseResponse {
  success: boolean;
}

export class UpsertPlayerMonthlyStatsUseCase {
  constructor(
    private readonly playerModalitiesRepo: IPlayerModalitiesRepository,
    private readonly playerModalityMonthsStatsRepo: IPlayerModalityMonthsStatsRepository,
    private readonly skillsRepo: ISkillsRepository,
    private readonly statsCalculator: StatsCalculatorService
  ) { }

  async execute({
    playerId,
    modalityId,
    month,
    skillsIdsWithCategory
  }: UpsertPlayerMonthlyStatsUseCaseRequest): Promise<UpsertPlayerMonthlyStatsUseCaseResponse> {
    // It should throw BusinessRuleException if the modality is not linked to the player.
    const playerModality = await this.playerModalitiesRepo.findByPlayerIdAndModalityId({ playerId, modalityId });
    if (!playerModality) {
      throw new BusinessRuleException('Modality not linked to player.');
    }

    // It should throw ResourceNotFoundException if no skills are found for the given modality.
    const skillsByModality = await this.skillsRepo.findManyByModalityId(modalityId);
    if (!skillsByModality.length) {
      throw new ResourceNotFoundException('Skills for Modality');
    }

    // It should calculate player statistics based on provided skills.
    const { playerModalityStats } = await this.statsCalculator.calculate({
      skillsByModality,
      skillsIdsWithCategory
    });

    // It should upsert the monthly stats and skill details.
    const success = await this.playerModalityMonthsStatsRepo.upsertMonthlyStats({
      playerModalityId: playerModality.id,
      month,
      skillsIdsWithCategory,
      playerModalityStats
    });

    // It should return success: true when the monthly stats are upserted.
    return { success };
  }
}
