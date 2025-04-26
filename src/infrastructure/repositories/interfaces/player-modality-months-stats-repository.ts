import type { AddCompleteModalityFlowData } from "@/shared/app-types/player-modality-months-stats-types";

export interface IPlayerModalityMonthsStatsRepository {
  addCompletePlayerModalityFlow(data: AddCompleteModalityFlowData): Promise<boolean>
}
