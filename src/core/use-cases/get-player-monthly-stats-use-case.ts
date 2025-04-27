import type { IPlayerModalityMonthsStatsRepository } from "@repositories/interfaces/player-modality-months-stats-repository"
import type { IPlayersRepository } from "@repositories/interfaces/players-repository"
import { ResourceNotFoundException } from "@errors/resource-not-found-exception"
import type { PlayerModalityMonthStats } from "@app-types/player-modality-months-stats-types"

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
  ) { }

  async execute({ playerModalityId, month }: GetPlayerMonthlyStatsUseCaseRequest): Promise<GetPlayerMonthlyStatsUseCaseResponse> {
    // It should return an empty array if no player modality month stats are found for the given player modality and month.
    const playerModalityMonthStats = await this.playerModalityMonthsStatsRepo.findByPlayerModalityIdAndMonth({ playerModalityId, month })

    return { playerModalityMonthStats }
  }
}