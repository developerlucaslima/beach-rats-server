export interface PlayerModality {
  id: string;
  playerId: string;
  modalityId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlayerModalityCreateParams {
  playerId: string;
  modalityId: string
}