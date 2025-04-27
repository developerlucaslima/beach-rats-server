import type { AddCompleteModalityFlowData, PlayerModalityMonthStats } from "@app-types/player-modality-months-stats-types";

export interface IPlayerModalityMonthsStatsRepository {
  findByPlayerModalityIdAndMonth(params: { playerModalityId: string, month: Date }): Promise<PlayerModalityMonthStats | null>
  upsertMonthlyStats(data: AddCompleteModalityFlowData): Promise<boolean>
}
