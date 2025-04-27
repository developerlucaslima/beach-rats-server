import { PrismaPlayerModalityMonthsStatsRepository } from "@repositories/prisma/player-modality-months-stats-repository";
import { GetPlayerMonthlyStatsUseCase } from "@use-cases/get-player-monthly-stats-use-case";

export function makeGetPlayerMonthlyStats() {
  const prismaPlayerModalityMonthsStatsRepository = new PrismaPlayerModalityMonthsStatsRepository();

  const getPlayerMonthlyStatsUseCase = new GetPlayerMonthlyStatsUseCase(prismaPlayerModalityMonthsStatsRepository);
  return getPlayerMonthlyStatsUseCase;
}
