import type { AddCompleteModalityFlowData } from "../types/player-modalities-types";

export interface IPlayerModalitiesRepository {
  addCompletePlayerModalityFlow(data: AddCompleteModalityFlowData)
    : Promise<{ playerModalityId: string, modalityMonthId: string }>
  hasModalityForPlayer(params: { playerId: string; modalityId: string }): Promise<boolean>
  countModalitiesForPlayer(playerId: string): Promise<number | null>
}
