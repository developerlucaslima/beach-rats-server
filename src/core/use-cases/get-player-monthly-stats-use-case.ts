import type { PlayerModalityMonthStats } from '@app-types/player-modality-months-stats-types'
import { BusinessRuleException } from '@errors/business-rules-exception'
import type { IPlayerModalityMonthsStatsRepository } from '@repositories/interfaces/player-modality-months-stats-repository'

interface GetPlayerMonthlyStatsUseCaseRequest {
  playerModalityId: string
  month: Date
}

interface GetPlayerMonthlyStatsUseCaseResponse {
  playerModalityMonthStats: PlayerModalityMonthStats | null
}

export class GetPlayerMonthlyStatsUseCase {
  constructor(
    private readonly playerModalityMonthsStatsRepo: IPlayerModalityMonthsStatsRepository,
  ) {}

  async execute({
    playerModalityId,
    month,
  }: GetPlayerMonthlyStatsUseCaseRequest): Promise<GetPlayerMonthlyStatsUseCaseResponse> {
    // It should throw BusinessRuleException if the provided month is in the future.
    if (month > new Date()) {
      throw new BusinessRuleException(
        'Cannot retrieve stats for a future month.',
      )
    }

    // It should return an empty array if no player modality month stats are found for the given player modality and month.
    const playerModalityMonthStats =
      await this.playerModalityMonthsStatsRepo.findByPlayerModalityIdAndMonth({
        playerModalityId,
        month,
      })

    return { playerModalityMonthStats }
  }
}
