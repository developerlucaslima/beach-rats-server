import { addPlayerModalityController } from '@controllers/add-player-modality-controller'
import { getPlayerMonthlyStatsController } from '@controllers/get-player-monthly-stats-controller'
import { getPlayerProfileController } from '@controllers/get-player-profile-controller'
import { setPlayerPasswordController } from '@controllers/set-player-password-controller'
import { updatePlayerPasswordController } from '@controllers/update-player-password-controller'
import { updatePlayerProfileController } from '@controllers/update-player-profile-controller'
import { verifyJwt } from '@middlewares/verify-jwt'
import { verifyRole } from '@middlewares/verify-role'
import type { FastifyInstance } from 'fastify'

import { authPlayerWithGoogleController } from '../controllers/auth-player-with-google-controller'
import { refreshTokenController } from '../controllers/refresh-token-controller'
import { signInPlayerController } from '../controllers/sign-in-player-controller'
import { signUpPlayerController } from '../controllers/sign-up-player-controller'

export async function playersRoutes(app: FastifyInstance) {
  /** Authenticate */
  app.post('/sign-up', signUpPlayerController)
  app.post('/sign-in', signInPlayerController)
  app.post('/auth/google', authPlayerWithGoogleController)

  /** Token Refresh */
  app.patch('/refresh-token', refreshTokenController)

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
}
