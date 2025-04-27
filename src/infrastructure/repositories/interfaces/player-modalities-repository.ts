import type { PlayerModality, PlayerModalityCreateParams } from "@app-types/player-modalities-types";

export interface IPlayerModalitiesRepository {
  add(data: PlayerModalityCreateParams): Promise<PlayerModality>
  addAsMainModality(data: PlayerModalityCreateParams): Promise<PlayerModality>
  findByPlayerIdAndModalityId(params: { playerId: string; modalityId: string }): Promise<PlayerModality>
  hasPlayerModality(params: { playerId: string; modalityId: string }): Promise<boolean>
  countModalitiesByPlayerId(playerId: string): Promise<number>
}
