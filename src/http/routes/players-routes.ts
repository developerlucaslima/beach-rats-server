import { addPlayerModalityController } from '@controllers/add-player-modality-controller'
import { getPlayerMonthlyStatsController } from '@controllers/get-player-monthly-stats-controller'
import { getPlayerProfileController } from '@controllers/get-player-profile-controller'
import { setPlayerPasswordController } from '@controllers/set-player-password-controller'
import { updatePlayerPasswordController } from '@controllers/update-player-password-controller'
import { updatePlayerProfileController } from '@controllers/update-player-profile-controller'
import { upsertPlayerMonthlyStatsController } from '@controllers/upsert-player-monthly-stats-controller'
import { verifyJwt } from '@middlewares/verify-jwt'
import { verifyRole } from '@middlewares/verify-role'
import type { FastifyInstance } from 'fastify'

export async function playersRoutes(app: FastifyInstance) {
  /** Authenticated */
  app.get(
    '/me',
    { onRequest: [verifyJwt, verifyRole('athlete')] },
    getPlayerProfileController,
  )
  app.post(
    '/me/modalities',
    { onRequest: [verifyJwt, verifyRole('athlete')] },
    addPlayerModalityController,
  )
  app.get(
    '/me/monthly-stats',
    { onRequest: [verifyJwt, verifyRole('athlete')] },
    getPlayerMonthlyStatsController,
  )
  app.patch(
    '/me/set-password',
    { onRequest: [verifyJwt, verifyRole('athlete')] },
    setPlayerPasswordController,
  )
  app.patch(
    '/me/update-password',
    { onRequest: [verifyJwt, verifyRole('athlete')] },
    updatePlayerPasswordController,
  )
  app.patch(
    '/me/update-profile',
    { onRequest: [verifyJwt, verifyRole('athlete')] },
    updatePlayerProfileController,
  )
  app.put(
    '/me/monthly-stats',
    { onRequest: [verifyJwt, verifyRole('athlete')] },
    upsertPlayerMonthlyStatsController,
  )
}
